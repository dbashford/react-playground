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

          .counter-container,
          .loading-container {
            display: inline-block;
            min-width: 25%;
            background-color: #ffffff;
            padding: 20px;
            color: rgba(0, 0, 0, 0.8);
            border-radius: 20px;
            margin: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -50%);
          }

          .loading-container {
            padding: 60px;
            min-width: 0;
          }

          .block-level-elem {
            display: block;
          }

          .button-container {
            margin-bottom: 20px;
          }

          .validation-error  {
            font-weight: normal;
            font-size: .85rem;
            color: red;
            margin-left: 10px;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .label {
            font-weight: bold;
          }

          input[type="radio"] {
            background-color: tan;
            margin-right: 10px;
            position: relative;
            top: 4px;
          }

          input[type="radio"]:focus {
            outline: none;
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
