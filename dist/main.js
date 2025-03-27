"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const uploadPath = path.join(process.cwd(), 'uploads');
    const fs = require('fs');
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    app.use('/uploads', express.static(uploadPath));
    app.enableCors();
    await app.listen(2403);
}
bootstrap();
//# sourceMappingURL=main.js.map