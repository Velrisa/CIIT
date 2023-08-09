# Como ejecutar el proyecto

El proyecto se divide en dos partes: por un lado del servidor (backend) y el lado del cliente (frontend). Cada parte se ejecuta en instancias diferentes.

**Para preparar y ejecutar el servidor**
1. Dentro de la carpeta del proyecto, se instalan las dependencias necesarias con el comando `npm install package-lock.json`
2. Para ejecutar el proyecto, se ingresa el comando `npm run dev`
3. Si el servidor inicia sin problemas, debe de aparecer el siguiente mensaje:
4. ![Servidor ejecutandose](https://i.postimg.cc/VNPQnr4L/1.png)
5. En caso de querer probar si el servidor esta funcionando correctamente, acceder desde el navegador a la dirección http://localhost:4000 y se debe de mostrar en pantalla este mensaje:
6. ![enter image description here](https://i.postimg.cc/zXDnDxrq/2.png)
7. Con eso ya tenemos el servidor funcionando




**Para preparar y ejecutar el cliente (lado del usuario)**

En otra instancia de la consola de comandos en la carpeta raiz del proyecto y ejecutar el siguiente comando: `npm create vite`

Le asignamos un nombre al proyecto que se va a crear (en este caso será `cliente`)

Luego se selecciona la opcion de `React`

En la siguiente opcion, seleccionamos `Javascript`

Ya teniendo creado el proyecto, se navega hasta la carpeta creada (cliente) con `cd cliente` (o similares)

Escribimos el comando `npm install`y esperamos a que termine

Despues se procese a instalar las siguientes dependencias: `npm install react-router-dom react-hook-form papaparse js-cookie react-google-recaptcha dayjs axios`

Despues se instalan las siguientes dependencias: `npm install tailwindcss@latest postcss@latest autoprefixer@latest`

Ya teniendo listas las dependencias, se extrae el archivo `cliente.zip` en la carpera raiz del proyecto. En caso de que se pida reescribir un fichero existente, presionar que si.

Importante: 
Ya teniendo listo el cliente, en la misma linea de comando (dentro de la carpeta cliente), se escribe el comando de `npm run dev` para poder usar la plataforma
