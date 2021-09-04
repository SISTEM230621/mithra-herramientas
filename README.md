# Mithra Herramientas

Mithra herramientas es un software que te ayudara a convertir los catalogos de las distintas plataformas de precios unitarios como lo son NEODATA, OPUS etc.


Esta aplicación fue creada con electronjs y vue-cli

1.-RUN npm install

2.-Instalar wine en linux ( sirve para generar el .exe de windows );

3.-Crear el archivo env.production

4.-Verificar la variable 
    - Windows: $env:GH_TOKEN
    -


NOTAS:

Generar iconos de la aplicación:
    - npm run electron:generate-icons

Publicar una nueva version en github
    - npm run electron:build -- --linux --win -p always