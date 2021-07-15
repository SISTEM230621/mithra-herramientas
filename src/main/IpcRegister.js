
const fs = require('fs');
const { dialog } = require('electron');


class IpcRegister {

    constructor(ipcMain) {
        this.ipcMain = ipcMain
    }

    registerOn() {
        this.ipcMain.handle('app:on-fs-dialog-open', (event) => {
            const files = dialog.showOpenDialogSync({
                properties: ['openFile', 'multiSelections'],
            });

            console.log(files);

            return files;
        })

    }

    // createFile() {
    //     return new Promise((resolve, reject) => {
    //         resolve("hola mundo")
    //     })
    // }
}

export default IpcRegister
