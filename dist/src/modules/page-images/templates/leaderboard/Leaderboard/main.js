"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const row_1 = require("./components/row");
const main = (rows) => `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">
  <title>LeaderBoard</title>
</head>
<body style="margin: 0; font-family: 'Open Sans', sans-serif; color: #FFFFFF; max-width: 100vw; max-height: 100vh">
  <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;
    background-color: #0D1243;
    overflow: hidden;"
  >
    <div style="
      width: 572px;
      box-sizing: border-box;"
    >
      ${rows.reduce((acc, row) => {
    return acc.concat('\n' + (0, row_1.leaderboardRow)(row));
}, '')}
    </div>
</div>
</body>
`;
exports.main = main;
//# sourceMappingURL=main.js.map