"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const clc = require("cli-color");
const path_1 = require("path");
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
const child_process_1 = require("child_process");
const inquirer_1 = require("inquirer");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("@notadd/user/entities/user.entity");
const crypto_1 = require("crypto");
function install() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`
                 _            _     _
     _ __   ___ | |_ __ _  __| | __| |
    | "_ \\ / _ \\| __/ _\` |/ _\` |/ _\` |
    | | | | (_) | || (_| | (_| | (_| |
    |_| |_|\\___/ \\__\\__,_|\\__,_|\\__,_|

    `);
        console.log(clc.blue("Please answer the following questions carefully:"));
        let result;
        result = yield inquirer_1.prompt([
            {
                type: "list",
                message: "Please select which database engine you want use:",
                name: "engine",
                choices: [
                    {
                        name: "Postgres",
                        value: "postgres",
                    },
                    {
                        name: "MySQL",
                        value: "mysql",
                    },
                    {
                        name: "Sqlite",
                        value: "sqlite",
                    },
                ],
                default: 0,
            },
        ]);
        const engine = result.engine;
        switch (engine) {
            case "postgres":
            case "mysql":
                result = yield inquirer_1.prompt([
                    {
                        type: "input",
                        message: "Database Host:",
                        name: "databaseHost",
                    },
                    {
                        type: "input",
                        message: "Database Port:",
                        name: "databasePort",
                    },
                    {
                        type: "input",
                        message: "Database Username:",
                        name: "databaseUsername",
                    },
                    {
                        type: "input",
                        message: "Database Password:",
                        name: "databasePassword",
                    },
                    {
                        type: "input",
                        message: "Database Name:",
                        name: "database",
                    },
                    {
                        type: "input",
                        message: "Administration Username:",
                        name: "username",
                    },
                    {
                        type: "input",
                        message: "Administration Email:",
                        name: "email",
                    },
                    {
                        type: "input",
                        message: "Administration Password:",
                        name: "password",
                    },
                ]);
                break;
            default:
                result = yield inquirer_1.prompt([
                    {
                        type: "input",
                        message: "Administration Username:",
                        name: "username",
                    },
                    {
                        type: "input",
                        message: "Administration Email:",
                        name: "email",
                    },
                    {
                        type: "input",
                        message: "Administration Password:",
                        name: "password",
                    },
                ]);
                break;
        }
        switch (engine) {
            case "postgres":
            case "mysql":
                fs_1.writeFileSync(path_1.join(process.cwd(), "ormconfig.yml"), js_yaml_1.safeDump({
                    "default": {
                        type: engine,
                        host: result.databaseHost,
                        port: result.databasePort,
                        username: result.databaseUsername,
                        password: result.databasePassword,
                        database: result.database,
                        entities: [
                            "**/*.entity.js",
                        ],
                        migrations: [
                            "**/*.migration.js",
                        ],
                        logging: true,
                        migrationsRun: false,
                        synchronize: false,
                    },
                }));
                break;
            default:
                fs_1.writeFileSync(path_1.join(process.cwd(), "ormconfig.yml"), js_yaml_1.safeDump({
                    "default": {
                        type: engine,
                        database: "./notadd.sqlite",
                        entities: [
                            "**/*.entity.js",
                        ],
                        migrations: [
                            "**/*.migration.js",
                        ],
                        logging: true,
                        migrationsRun: false,
                        synchronize: false,
                    },
                }));
                break;
        }
        let wanted = "";
        switch (engine) {
            case "mysql":
                wanted = "mysql";
                break;
            case "sqlite":
                wanted = "sqlite3";
                break;
            default:
                wanted = "pg";
                break;
        }
        addPackageForDatabase(wanted);
        yield addAdministrationUser(result.username, result.email, result.password);
        console.log(clc.blue("Notadd install successfully!"));
    });
}
function addPackageForDatabase(engine) {
    console.log(clc.blue(`Install package for database engine ${engine}...`));
    child_process_1.execSync(`yarn add ${engine} -W`, {
        cwd: process.cwd(),
        env: process.env,
        stdio: ["ignore", process.stdout, process.stderr],
    });
    console.log(clc.blue(`Installed package ${engine}`));
}
function addAdministrationUser(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield typeorm_1.createConnection();
        yield connection.synchronize(false);
        const repository = connection.getRepository(user_entity_1.User);
        const user = repository.create({
            username: username,
            email: email,
            password: crypto_1.createHmac('sha256', password).digest('hex'),
        });
        yield repository.save(user);
        yield connection.close();
    });
}
install();
