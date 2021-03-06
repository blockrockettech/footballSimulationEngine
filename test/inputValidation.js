const mocha = require('mocha')
const { expect } = require('chai')
const validation = require('./lib/validate_tests')

//disable console errors in tests
console.error = function() {}

function runTest() {
  mocha.describe('testValidationOfInputData()', function() {
    mocha.it('init game returns an object', async() => {
      let t1location = './init_config/team1.json'
      let t2location = './init_config/team2.json'
      let plocation = './init_config/pitch.json'

      let initJSON = await validation.initGame(t1location, t2location, plocation)

      expect(initJSON).to.be.an('object')
    })
    mocha.it('playIteration returns an Object', async() => {
      let providedItJson = './init_config/iteration.json'

      let outputIteration = await validation.playIteration(providedItJson)

      expect(outputIteration).to.be.an('object')
    })
    mocha.it('start second half returns an Object', async() => {
      let providedItJson = './init_config/iteration.json'

      let shJSON = await validation.setupSecondHalf(providedItJson)

      expect(shJSON).to.be.an('object')
    })
  })
  mocha.describe('testValidationOfBadInitInputData()', function() {
    mocha.it('init game fails on pitch height', async() => {
      let t1location = './init_config/team1.json'
      let t2location = './init_config/team2.json'
      let plocation = './test/input/badInput/badPitchHeight.json'
      try {
        let output = await validation.initGame(t1location, t2location, plocation)
        expect(output).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        expect(err.toString()).to.have.string('Please provide pitchWidth and pitchHeight')
      }
    })
    mocha.it('init game fails on pitch width', async() => {
      let t1location = './init_config/team1.json'
      let t2location = './init_config/team2.json'
      let plocation = './test/input/badInput/badPitchWidth.json'
      try {
        let output = await validation.initGame(t1location, t2location, plocation)
        expect(output).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        expect(err.toString()).to.have.string('Please provide pitchWidth and pitchHeight')
      }
    })
    mocha.it('init game fails on bad team name', async() => {
      let t1location = './test/input/badInput/badTeamName.json'
      let t2location = './init_config/team2.json'
      let plocation = './init_config/pitch.json'
      try {
        let output = await validation.initGame(t1location, t2location, plocation)
        expect(output).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        expect(err.toString()).to.have.string('No team name given')
      }
    })
    mocha.it('init game fails on not enough players', async() => {
      let t1location = './test/input/badInput/notEnoughPlayers.json'
      let t2location = './init_config/team2.json'
      let plocation = './init_config/pitch.json'
      try {
        let output = await validation.initGame(t1location, t2location, plocation)
        expect(output).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        expect(err.toString()).to.have.string('There must be 11 players in a team')
      }
    })
    mocha.it('init game fails on player no strength', async() => {
      let t1location = './test/input/badInput/playerNoStrength.json'
      let t2location = './init_config/team2.json'
      let plocation = './init_config/pitch.json'
      try {
        let output = await validation.initGame(t1location, t2location, plocation)
        expect(output).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        let expectedString = 'Provide skills: passing,shooting,tackling,saving,agility,strength,penalty_taking,jumping'
        expect(err.toString()).to.have.string(expectedString)
      }
    })
    mocha.it('init game fails on player no injury', async() => {
      let t1location = './test/input/badInput/noInjury.json'
      let t2location = './init_config/team2.json'
      let plocation = './init_config/pitch.json'
      try {
        let output = await validation.initGame(t1location, t2location, plocation)
        expect(output).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        expect(err.toString()).to.have.string('Player must contain JSON variable: injured')
      }
    })
    mocha.it('init game fails on player no fitness', async() => {
      let t1location = './test/input/badInput/noFitness.json'
      let t2location = './init_config/team2.json'
      let plocation = './init_config/pitch.json'
      try {
        let output = await validation.initGame(t1location, t2location, plocation)
        expect(output).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        expect(err.toString()).to.have.string('Player must contain JSON variable: fitness')
      }
    })
  })
  mocha.describe('testValidationOfBadIterationInputData()', function() {
    mocha.it('playIteration no player name', async() => {
      let providedItJson = './test/input/badInput/noPlayerNameIteration.json'
      try {
        let outputIteration = await validation.playIteration(providedItJson)
        expect(outputIteration).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        expect(err.toString()).to.have.string('Player must contain JSON variable: name')
      }
    })
    mocha.it('playIteration no half', async() => {
      let providedItJson = './test/input/badInput/noHalf.json'
      try {
        let outputIteration = await validation.playIteration(providedItJson)
        expect(outputIteration).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        expect(err.toString()).to.have.string('Please provide valid match details JSON')
      }
    })
    mocha.it('playIteration no ball with team', async() => {
      let providedItJson = './test/input/badInput/noBallWithTeam.json'
      try {
        let outputIteration = await validation.playIteration(providedItJson)
        expect(outputIteration).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        let expectedOutput = 'Provide: position,withPlayer,Player,withTeam,direction,ballOverIterations'
        expect(err.toString()).to.have.string(expectedOutput)
      }
    })
    mocha.it('playIteration no start pos', async() => {
      let providedItJson = './test/input/badInput/noStartPos.json'
      try {
        let outputIteration = await validation.playIteration(providedItJson)
        expect(outputIteration).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        expect(err.toString()).to.have.string('Player must contain JSON variable: startPOS')
      }
    })
    mocha.it('playIteration no iteration log', async() => {
      let providedItJson = './test/input/badInput/noIterationLog.json'
      try {
        let outputIteration = await validation.playIteration(providedItJson)
        expect(outputIteration).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        expect(err.toString()).to.have.string('Please provide valid match details JSON')
      }
    })
  })
  mocha.describe('testValidationOfSecondHalfInputData()', function() {
    mocha.it('start second half no intent', async() => {
      let providedItJson = './test/input/badInput/secondHalfNoIntent.json'
      try {
        let shJSON = await validation.setupSecondHalf(providedItJson)
        expect(shJSON).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        expect(err.toString()).to.have.string('No team intent given.')
      }
    })
    mocha.it('start second half no kick off team', async() => {
      let providedItJson = './test/input/badInput/secondHalfNoKickoffTeam.json'
      try {
        let shJSON = await validation.setupSecondHalf(providedItJson)
        expect(shJSON).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        expect(err.toString()).to.have.string('Please provide valid match details JSON')
      }
    })
    mocha.it('start second half no red card', async() => {
      let providedItJson = './test/input/badInput/secondHalfNoRedCard.json'
      try {
        let shJSON = await validation.setupSecondHalf(providedItJson)
        expect(shJSON).to.be.an('Error')
      } catch (err) {
        expect(err).to.be.an('Error')
        expect(err.toString()).to.have.string('Provide Cards: yellow,red')
      }
    })
  })
}

module.exports = {
  runTest
}
