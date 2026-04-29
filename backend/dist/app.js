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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const pool = new pg_1.Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "college_db",
});
pool.connect()
    .then(() => console.log("DB Connected ✅"))
    .catch(err => console.error("DB Connection Error ❌:", err));
app.get("/colleges", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query("SELECT * FROM colleges");
        res.json(result.rows);
    }
    catch (err) {
        console.error("FULL ERROR:", err); // 👈 terminal
        res.status(500).json({ error: err.message }); // 👈 show real error in browser
    }
}));
app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});
