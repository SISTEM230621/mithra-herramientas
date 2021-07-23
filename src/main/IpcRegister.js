const { dialog } = require('electron');
const fs = require('fs-extra');
const ExcelJS = require('exceljs');
const XLSX = require('xlsx');
const os = require('os');
const path = require('path');
const dirNeodataC = path.resolve(os.homedir(), 'mithraH/neodatac');
const open = require('open');
const notification = require( './notification' );
const chokidar = require("chokidar");


class IpcRegister {

    constructor(ipcMain) {
        this.ipcMain = ipcMain
    }

    registerOn() {

        this.ipcMain.handle('app:on-file-convert', async (event, file) => {

            if (fs.existsSync(file.path)) {
                const result = await this.convertir(file)
                return result
            } else {
                return JSON.stringify({ success: false, status: "ERROR", message: 'No existe el archivo' });
            }
        });

        this.ipcMain.handle('app:get-files', async () => {
            const files = await this.getFiles();
            return files;

        });

        this.ipcMain.on('app:on-file-delete', (event, file) => {
            this.deleteFile(file.path);
        });

        this.ipcMain.on('app:on-file-open', (event, file) => {
            this.openFile(file.path);
        });
        this.ipcMain.on('app:on-file-move', (event, file) => {
            this.moveFile(file);
        });
    }


    ESTOTAL(todo) {
        if (!todo) {
            return "NINGUNO";
        }

        let codigo = Object.prototype.hasOwnProperty.call(todo, "codigo");
        let concepto = Object.prototype.hasOwnProperty.call(todo, "concepto");
        let unidad = Object.prototype.hasOwnProperty.call(todo, "unidad");
        let cantidad = Object.prototype.hasOwnProperty.call(todo, "cantidad");
        let p_unitario = Object.prototype.hasOwnProperty.call(todo, "p_unitario");
        let importe = Object.prototype.hasOwnProperty.call(todo, "importe");

        if (codigo && importe) {
            return "CONCEPTO";
        }

        if (
            concepto &&
            !codigo &&
            !unidad &&
            !cantidad &&
            !p_unitario &&
            !importe
        ) {
            return "PARTIDA";
        } else if (
            concepto &&
            !codigo &&
            !unidad &&
            !cantidad &&
            !p_unitario &&
            importe
        ) {
            return "TOTAL";
        }
    }
    convertir(file) {
        return new Promise(async (resolve, reject) => {

            var buf = fs.readFileSync(file.path);
            var workbook = XLSX.read(buf);
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];

            let xls = XLSX.utils.sheet_to_json(worksheet, {
                header: [
                    "codigo",
                    "concepto",
                    "unidad",
                    "cantidad",
                    "p_unitario",
                    "importe",
                ],
            });



            fs.ensureDirSync(dirNeodataC);
            const filePath = path.resolve(dirNeodataC, `${file.name}`);
            const wb = new ExcelJS.Workbook();
            const sheet = wb.addWorksheet('catalogo');


            let pg = "";
            let pg2 = "";
            let pg3 = "";
            let pg4 = "";
            let seleccionado = "pg";
            let inicia_union_concepto = false;
            let nuevo_concepto = null;

            xls.forEach((todo, i) => {
                try {
                    const RESP = this.ESTOTAL(todo);
                    if (RESP == "PARTIDA") {
                        switch (seleccionado) {
                            case "pg":
                                pg = todo.concepto
                                seleccionado = "pg2";
                                break;
                            case "pg2":
                                pg2 = todo.concepto
                                seleccionado = "pg3";
                                break;
                            case "pg3":
                                pg3 = todo.concepto
                                seleccionado = "pg4";
                                break;
                            case "pg4":
                                pg4 = todo.concepto
                                seleccionado = "pg";

                                break;
                        }
                    }

                    if (RESP == "CONCEPTO") {

                        let codigo = Object.prototype.hasOwnProperty.call(todo, "codigo");
                        let importe = Object.prototype.hasOwnProperty.call(
                            todo,
                            "importe"
                        );

                        if (inicia_union_concepto) {
                            let concepto_aux = Object.prototype.hasOwnProperty.call(
                                todo,
                                "concepto"
                            );
                            let cantidad_aux = Object.prototype.hasOwnProperty.call(
                                todo,
                                "cantidad"
                            );
                            let importe_aux = Object.prototype.hasOwnProperty.call(
                                todo,
                                "importe"
                            );
                            let p_unitario_aux = Object.prototype.hasOwnProperty.call(
                                todo,
                                "p_unitario"
                            );

                            if (
                                concepto_aux &&
                                cantidad_aux &&
                                importe_aux &&
                                p_unitario_aux &&
                                !codigo
                            ) {
                                nuevo_concepto.concepto += todo.concepto;
                            } else {
                                sheet.addRow([
                                    pg,
                                    pg2 == "" ? undefined : pg2,
                                    pg3 == "" ? undefined : pg3,
                                    pg4 == "" ? undefined : pg4,
                                    todo.codigo,
                                    todo.concepto,
                                    todo.unidad,
                                    todo.cantidad,
                                    todo.p_unitario,
                                    todo.importe,
                                ]);

                                inicia_union_concepto = false;
                                nuevo_concepto = null;
                            }
                        }

                        if (codigo && importe && !inicia_union_concepto) {
                            inicia_union_concepto = true;
                            nuevo_concepto = todo;
                        }



                    }

                    if (RESP == "TOTAL") {

                        if (pg != "" && pg2 != "" && pg3 != "" && pg4 != "") {
                            pg4 = ""
                            seleccionado = "pg4"
                        } else if (pg != "" && pg2 != "" && pg3 != "" && pg4 == "") {
                            pg3 = ""
                            seleccionado = "pg3"
                        } else if (pg != "" && pg2 != "" && pg3 == "" && pg4 == "") {
                            pg2 = ""
                            seleccionado = "pg2"
                        } else if (pg != "" && pg2 == "" && pg3 == "" && pg4 == "") {
                            pg = ""
                            seleccionado = "pg"
                        }


                    }


                } catch (error) {
                    resolve(JSON.stringify({ success: false, status: "ERROR", message: 'Ha ocurrido un error al convertir el archivo' }))
                }

            });

            await wb.xlsx.writeFile(filePath).then(() => { });


            resolve(JSON.stringify({ success: true, status: "FINISH", message: 'Conversión exitosa' }))


        });
    }
    getFiles() {
        return new Promise((resolve, reject) => {
            const files = fs.readdirSync(dirNeodataC);
            let _files = files.map(filename => {
                const filePath = path.resolve(dirNeodataC, filename);

                const fileStats = fs.statSync(filePath);
                return {
                    name: filename,
                    path: filePath,
                    size: Number(fileStats.size / 1000).toFixed(1),
                    date: fileStats.mtime
                };
            });

            _files.sort(function (a, b) { a = new Date(a.date); b = new Date(b.date); return a > b ? -1 : a < b ? 1 : 0; });

            resolve(JSON.stringify({ success: true, files: _files }))
        });

    }
    deleteFile(filepath) {
        const _filePath = path.resolve(dirNeodataC, filepath);
        if (fs.existsSync(_filePath)) {
            fs.removeSync(_filePath);
        }
    }
    openFile(filepath) {
        const _filePath = path.resolve(dirNeodataC, filepath);
        if (fs.existsSync(_filePath)) {
            open(_filePath);
        }
    }
    moveFile(file) {
        const directory = dialog.showOpenDialogSync({
            properties: ['openDirectory'],
        });

        if (directory != undefined) {

            const src = path.resolve(dirNeodataC, file.path);
            const ori = path.resolve(directory[0], file.filename);

            if (fs.existsSync(src)) {
                fs.copyFileSync(src, ori);
                notification.show('Archivo descargado', `El archivo esta disponible en ${ori}`);
            }
        }
    }


}

const watchFiles = (webContents) => {
    chokidar.watch(dirNeodataC).on('unlink', (filepath) => {
        webContents.send('app:delete-file', path.parse(filepath).base);
    });
}


export {
    IpcRegister,
    watchFiles
}
