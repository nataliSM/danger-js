"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var GitHubGit_1 = require("../platforms/github/GitHubGit");
exports.jsonDSLGenerator = function (platform, source, program) { return __awaiter(_this, void 0, void 0, function () {
    var _a, useSimpleDSL, git, _b, getDSLFunc, platformDSL, cliArgs, dslPlatformName;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                useSimpleDSL = platform.getPlatformReviewSimpleRepresentation && source.useEventDSL;
                if (!useSimpleDSL) return [3 /*break*/, 1];
                _b = GitHubGit_1.emptyGitJSON();
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, platform.getPlatformGitRepresentation()];
            case 2:
                _b = _c.sent();
                _c.label = 3;
            case 3:
                git = _b;
                getDSLFunc = useSimpleDSL
                    ? platform.getPlatformReviewSimpleRepresentation
                    : platform.getPlatformReviewDSLRepresentation;
                return [4 /*yield*/, getDSLFunc()];
            case 4:
                platformDSL = _c.sent();
                cliArgs = {
                    base: program.base,
                    dangerfile: program.dangerfile,
                    externalCiProvider: program.externalCiProvider,
                    id: program.id,
                    textOnly: program.textOnly,
                    verbose: program.verbose,
                };
                dslPlatformName = jsonDSLPlatformName(platform);
                return [2 /*return*/, (_a = {
                            git: git
                        },
                        _a[dslPlatformName] = platformDSL,
                        _a.settings = {
                            github: {
                                accessToken: process.env["DANGER_GITHUB_API_TOKEN"] || process.env["GITHUB_TOKEN"] || "NO_TOKEN",
                                additionalHeaders: {},
                                baseURL: process.env["DANGER_GITHUB_API_BASE_URL"] || process.env["GITHUB_URL"] || undefined,
                            },
                            cliArgs: cliArgs,
                        },
                        _a)];
        }
    });
}); };
var jsonDSLPlatformName = function (platform) {
    switch (platform.name) {
        case "BitBucketServer":
            return "bitbucket_server";
        case "BitBucketCloud":
            return "bitbucket_cloud";
        case "GitLab":
            return "gitlab";
        case "GitHub":
            return "github";
        default:
            return platform.name.split(" ").join("_");
    }
};
//# sourceMappingURL=dslGenerator.js.map