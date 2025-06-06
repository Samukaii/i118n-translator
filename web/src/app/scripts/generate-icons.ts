const path = require("node:path");
const fs = require("node:fs");

const kebabToCamel = (input: string) => {
    return input.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

const generateIconAsConst = (constName: string, content: string) => {
    const lines = [`export const ${constName} = \``];

    lines.push(content.trim());
    lines.push('\`;\n');

    return lines.join('\n');
}

const generateIconsMapping = (icons: { path: string; content: string; constName: string; fileName: string }[]) => {
    const lines: string[] = [];

    icons.forEach(icon => {
        lines.push(`import { ${icon.constName} } from './${icon.fileName.replace('.ts', '')}';`);
    });

    lines.push('', '');

    lines.push('export const iconsMapping = {');

    icons.forEach(icon => {
        lines.push(`    '${icon.fileName.replace('.ts', '')}': ${icon.constName},`);
    });

    lines.push("};\n");

    return lines.join('\n');
}

const generateIcons = () => {
    const assetsPath = path.resolve(`public/assets/icons`);
    const interfaceIconsPath = path.resolve(`src/app/shared/static/icons`);

    if (!fs.existsSync(interfaceIconsPath)) {
        fs.mkdirSync(interfaceIconsPath);
    }

    const files = fs.readdirSync(assetsPath) as string[];

    const result = files.map((file: any) => {
        const iconPath = path.join(assetsPath, file);

        const content = fs.readFileSync(iconPath, 'utf-8');

        return {
            path: iconPath as string,
            content: content as string,
        }
    });

    const constIcons = result.map((icon) => {
        const newPath = icon.path.replace(assetsPath, interfaceIconsPath).replace("svg", "ts");
        const fileName = newPath.split("\\").pop()!;

        const constName = kebabToCamel(fileName.replace(".ts", ""));

        const result = generateIconAsConst(constName, icon.content);

        return {path: newPath, content: result, constName, fileName};
    });

    for (const constIcon of constIcons) {
        fs.writeFileSync(constIcon.path, constIcon.content);
    }

    const iconsMappingPath = `${interfaceIconsPath}/icons-mapping.ts`;
    const content = generateIconsMapping(constIcons);

    fs.writeFileSync(iconsMappingPath, content);
}

generateIcons();