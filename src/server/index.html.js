export default function generateIndex(location) {
  return `<html>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css"/>
        <style>
          #app-container {
            background-color: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
            position: relative;
          }

        </style>
    </head>
    <body>
      <div id="app-container">
      </div>
      <script type="text/javascript" src="${location}" charset="utf-8"></script>
    </body>
  </html>`
};
