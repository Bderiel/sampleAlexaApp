require('dotenv').config();

const APP_ID = process.env.ALEXA_APP_ID;
const { java, ionic } = require('./data');
const Alexa = require('alexa-sdk');

const skillName = 'The Polyglot';


const handlers = {

  LanguageIntent() {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    let speechOutput = '';
    if (this.event.request.intent.slots.Language.value && this.event.request.intent.slots.Language.value.toLowerCase() == 'java') {
      speechOutput = java[getRandomInt(0, 2)];
    } else if (this.event.request.intent.slots.Language.value && this.event.request.intent.slots.Language.value.toLowerCase() == 'ionic framework') {
      speechOutput = ionic[getRandomInt(0, 3)];
    } else {
      speechOutput = "I don't have anything interesting to share regarding what you've asked.";
    }
    this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
  },

  AboutIntent() {
    const speechOutput = 'The Polyglot Developer, Nic Raboy, is from San Francisco, California';
    this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
  },

  'AMAZON.HelpIntent': function () {
    let speechOutput = '';
    speechOutput += 'Here are some things you can say: ';
    speechOutput += 'Tell me something interesting about Java. ';
    speechOutput += 'Tell me about the skill developer. ';
    speechOutput += "You can also say stop if you're done. ";
    speechOutput += 'So how can I help?';
    this.emit(':ask', speechOutput, speechOutput);
  },

  'AMAZON.StopIntent': function () {
    const speechOutput = 'Goodbye';
    this.emit(':tell', speechOutput);
  },

  'AMAZON.CancelIntent': function () {
    const speechOutput = 'Goodbye';
    this.emit(':tell', speechOutput);
  },

  LaunchRequest() {
    let speechText = '';
    speechText += `Welcome to ${skillName}. `;
    speechText += 'You can ask a question like, tell me something interesting about Java. ';
    const repromptText = 'For instructions on what you can say, please say help me.';
    this.emit(':ask', speechText, repromptText);
  },

};

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
