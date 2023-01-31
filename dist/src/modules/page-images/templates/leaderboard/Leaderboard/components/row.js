"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardRow = exports.PrizeCurrency = void 0;
const prizeIcons = require("./prizeIcons");
const medals = require("./medals");
const points_1 = require("./points");
var PrizeCurrency;
(function (PrizeCurrency) {
    PrizeCurrency["realMoney"] = "realMoney";
    PrizeCurrency["tokens"] = "tokens";
})(PrizeCurrency = exports.PrizeCurrency || (exports.PrizeCurrency = {}));
const medalTypes = {
    '1': 'goldMedal',
    '2': 'silverMedal',
    '3': 'bronzeMedal',
};
const derivePlaceOrMedal = (place) => {
    return medalTypes[place] ? medals[medalTypes[place]] : place;
};
const leaderboardRow = ({ place, userName, totalPoints, prizeCurrency, prizeAmountOrTangible, isUser, }) => `<div style="
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 4px;
  padding: 12px 16px;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: ${isUser ? '#737EF8' : '#182294'};"
>
        <div style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 4px;"
        >
          <div style="
            display: flex;
            flex-direction: row;
            justify-content: flex-start;"
          >
            <div style="
              display: flex;
              justify-content: center;
              align-items: center;
              padding-right: 12px;
              width: 32px;
              height: 32px;
              font-weight: 700;
              font-size: 26px;
              line-height: 32px;"
            >
              <!-- Here you can pass the icon image or display none + text place-->
              ${derivePlaceOrMedal(place)}
            </div>
            <div style="
              display: flex;
              align-items: center;
              font-weight: 400;
              font-size: 26px;
              line-height: 32px;"
            >
              <!-- The name of the participant -->
              ${userName}
            </div>
            ${isUser
    ? `
                  <div style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 52px;
                    height: 32px;
                    margin: auto;
                    background-color: #151C6B;
                    border-radius: 4px;
                    font-weight: 400;
                    font-size: 20px;
                    line-height: 28px;"
                  >
                    You
                  </div>
              `
    : ''}
          </div>
        
        
        <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;"
        >
          <div style="padding-right: 8px; width: 36px; height: 36px;">
            ${points_1.points}
          </div>
          <div  style="
              min-width: 82px;
              font-weight: 700;
              font-size: 26px;
              line-height: 32px;"
          >
            <!-- The points value of the participant -->
            ${totalPoints}
          </div>
        </div>
        </div>
        
        <div style="
          display: flex;
          flex-direction: row;
          max-width: 368px;
          padding-left: 44px;
          font-weight: 700;
          font-size: 18px;
          line-height: 24px;"
        >
        <!-- The place of the participant if tangible price display none the image container -->
          ${prizeCurrency ? prizeIcons[prizeCurrency] : ''}
        <!-- The prize value -->
          ${prizeAmountOrTangible}
        </div>
</div>`;
exports.leaderboardRow = leaderboardRow;
//# sourceMappingURL=row.js.map