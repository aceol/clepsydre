import { describe, it } from "node:test";
import assert from "node:assert";
import { updateTimer, updateBackground } from "../utils.mjs";

describe('Update timer', () => {
  [
    { timer: '00:00', time: 0 },
    { timer: '00:02', time: 2 },
    { timer: '01:01', time: 61 },
    { timer: '1440:01', time: 86401 }
  ].forEach(({ timer, time }) => {
    it(`with ${time} displays ${timer}`, () => {
      assert.equal(updateTimer(time), timer);
    })
  })
});

describe('updateBackground', () => {
  const background = {
    style: { height: 0 }, classList: { value: [] }
  }
  const settings = {
    firstThreshold: 0.3,
    secondThreshold: 0.6,
    thirdThreshold: 0.9
  };


  [
    { progress: 0.2, height: '20px', classe: 'start' },
    { progress: 0.5, height: '50px', classe: 'critical' },
    { progress: 0.8, height: '80px', classe: 'very-critical' },
    { progress: 0.95, height: '95px', classe: 'ending' }
  ].forEach(({ progress, height, classe }) => {
    it(`with a progress of ${progress}, it should update the background height to ${height} and pick class '${classe}'`, () => {

      updateBackground({ background, totalHeight: 100, progress, settings });
      assert.equal(background.style.height, height);
      assert.equal(background.classList.value.includes(classe), true);
    });
  });
});

