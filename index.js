"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.chat = exports.api = void 0;
var auth_1 = require("@twurple/auth");
var chat_1 = require("@twurple/chat");
var dotenv = require("dotenv");
var fs = require('fs-extra');
var path_1 = require("path");
var conf_1 = require("conf");
var api_1 = require("@twurple/api");
var vm2_1 = require("vm2");
dotenv.config();
var state = new conf_1["default"]({
    projectName: 'twitch-bot',
    configName: 'state'
});
var token = fs.readJSONSync((0, path_1.join)(process.cwd(), 'token.json'));
var clientId = 'gp762nuuoqcoxypju8c569th9wz7q5';
var clientSecret = 'p0v7fqjhxxrh1mbndlj59nn9b5mcje';
var authProvider = new auth_1.RefreshingAuthProvider({
    clientId: clientId,
    clientSecret: clientSecret,
    onRefresh: function (token) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.writeJSON((0, path_1.join)(process.cwd(), 'token.json'), token)];
                case 1:
                    _a.sent();
                    console.log('Token refreshed!');
                    return [2 /*return*/];
            }
        });
    }); }
}, token);
var channels = [
    'omnicarp1',
    'forsen',
    'forsen_imposter',
    'devjimmyboy',
];
exports.api = new api_1.ApiClient({
    authProvider: authProvider
});
exports.chat = new chat_1.ChatClient({ authProvider: authProvider });
exports.chat.onConnect(function () { return console.log('Connected to chat!'); });
exports.chat.onRegister(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _loop_1, _i, channels_1, chan;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Registered to chat as', exports.chat.currentNick, '!');
                _loop_1 = function (chan) {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, exports.chat.join(chan)["catch"](function (reason) {
                                    console.log('failed to join', chan, 'becouse', reason);
                                })];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, channels_1 = channels;
                _a.label = 1;
            case 1:
                if (!(_i < channels_1.length)) return [3 /*break*/, 4];
                chan = channels_1[_i];
                return [5 /*yield**/, _loop_1(chan)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                joinAllChannels();
                return [2 /*return*/];
        }
    });
}); });
exports.chat.connect();
var syh = false;
var sydcooldown = false;
var modChat = false;
var shutdown = Date.now();
var vm = new vm2_1.VM({
    timeout: 1000
});
var joined = [];
function joinAllChannels() {
    return __awaiter(this, void 0, void 0, function () {
        var streams, numLowViewers, _loop_2, _i, _a, stream;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, exports.api.streams.getStreams({
                        type: 'live',
                        limit: 50,
                    })];
                case 1:
                    streams = _b.sent();
                    numLowViewers = 0;
                    _b.label = 2;
                case 2:
                    if (!(numLowViewers < 10)) return [3 /*break*/, 9];
                    _loop_2 = function (stream) {
                        var channel;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (stream.viewers < 4 || joined.includes(stream.userName)) {
                                        if (stream.viewers < 4)
                                            numLowViewers++;
                                        return [2 /*return*/, "continue"];
                                    }
                                    channel = stream.userName;
                                    return [4 /*yield*/, exports.chat
                                            .join(channel)
                                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                joined.push(channel);
                                                console.log('Joined', channel, '-', stream.viewers, 'viewers', '(', joined.length, 'joined');
                                                return [2 /*return*/];
                                            });
                                        }); })["catch"](function (reason) {
                                            console.log('failed to join', channel, 'becouse', reason);
                                        })];
                                case 1:
                                    _c.sent();
                                    return [4 /*yield*/, sleep(350)];
                                case 2:
                                    _c.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, _a = streams.data;
                    _b.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    stream = _a[_i];
                    return [5 /*yield**/, _loop_2(stream)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, exports.api.streams.getStreams({
                        type: 'live',
                        after: streams.cursor,
                        limit: 50
                    })];
                case 7:
                    streams = _b.sent();
                    return [4 /*yield*/, sleep(1000)];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 2];
                case 9:
                    console.log('JOINED ALL STREAMS RECONNECT IN 15MIN');
                    setTimeout(joinAllChannels, 15 * 60 * 1000);
                    return [2 /*return*/];
            }
        });
    });
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
