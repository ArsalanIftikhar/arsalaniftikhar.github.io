import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const outputRoot = path.join(root, "_site");

const topLevelPublicFiles = [
  "index.html",
  "projects.html",
  "approach.html",
  "experience.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
];

const publicDirectories = ["assets", "projects", "insights"];
const approvedGeneratedHtmlRoutes = new Set(["about.html", "contact.html"]);
const approvedGeneratedAssetRoutes = new Set([
  "assets/css/portfolio.css",
  "assets/js/theme.js",
  "assets/js/navigation.js",
]);

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(absolutePath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

function toRelative(absolutePath) {
  return path.relative(root, absolutePath).split(path.sep).join("/");
}

async function hashFile(filePath) {
  const contents = await readFile(filePath);
  return createHash("sha256").update(contents).digest("hex");
}

async function assertDirectoryExists(relativePath, failures) {
  const target = path.join(outputRoot, relativePath);

  try {
    const details = await stat(target);
    if (!details.isDirectory()) {
      failures.push(`Expected output directory but found another file type: ${relativePath}`);
    }
  } catch {
    failures.push(`Missing output directory: ${relativePath}`);
  }
}

async function main() {
  if (!existsSync(outputRoot)) {
    throw new Error("_site does not exist. Run `npm run build` before `npm run check:legacy`.");
  }

  const failures = [];
  const missingLegacyFiles = [];
  const missingLegacyRoutes = [];
  const differingLegacyFiles = [];
  const missingApprovedGeneratedRoutes = [];
  const missingApprovedGeneratedAssets = [];
  const unexpectedGeneratedRoutes = [];
  const unexpectedGeneratedOutput = [];
  const sourceFiles = new Map();
  const htmlRoutes = new Set();

  for (const relativePath of topLevelPublicFiles) {
    sourceFiles.set(relativePath, path.join(root, relativePath));

    if (relativePath.endsWith(".html")) {
      htmlRoutes.add(relativePath);
    }
  }

  for (const directory of publicDirectories) {
    await assertDirectoryExists(directory, failures);

    const directoryPath = path.join(root, directory);
    const files = await listFiles(directoryPath);

    for (const file of files) {
      const relativePath = toRelative(file);
      sourceFiles.set(relativePath, file);

      if (relativePath.endsWith(".html")) {
        htmlRoutes.add(relativePath);
      }
    }
  }

  for (const [relativePath, sourcePath] of sourceFiles) {
    const outputPath = path.join(outputRoot, relativePath);

    if (!existsSync(outputPath)) {
      missingLegacyFiles.push(relativePath);
      failures.push(`Missing copied output: ${relativePath}`);
      continue;
    }

    const [sourceHash, outputHash] = await Promise.all([
      hashFile(sourcePath),
      hashFile(outputPath),
    ]);

    if (sourceHash !== outputHash) {
      differingLegacyFiles.push(relativePath);
      failures.push(`Output differs from source: ${relativePath}`);
    }
  }

  const generatedOutputFiles = (await listFiles(outputRoot)).map((file) =>
    path.relative(outputRoot, file).split(path.sep).join("/"),
  );

  const generatedHtmlRoutes = new Set(
    generatedOutputFiles.filter((relativePath) => relativePath.endsWith(".html")),
  );

  for (const route of htmlRoutes) {
    if (!generatedHtmlRoutes.has(route)) {
      missingLegacyRoutes.push(route);
      failures.push(`Missing HTML route: ${route}`);
    }
  }

  for (const route of approvedGeneratedHtmlRoutes) {
    if (!generatedHtmlRoutes.has(route)) {
      missingApprovedGeneratedRoutes.push(route);
      failures.push(`Missing approved generated HTML route: ${route}`);
    }
  }

  for (const route of approvedGeneratedAssetRoutes) {
    if (!generatedOutputFiles.includes(route)) {
      missingApprovedGeneratedAssets.push(route);
      failures.push(`Missing approved generated design-system asset: ${route}`);
    }
  }

  for (const route of generatedHtmlRoutes) {
    if (!htmlRoutes.has(route) && !approvedGeneratedHtmlRoutes.has(route)) {
      unexpectedGeneratedRoutes.push(route);
      failures.push(`Unexpected generated HTML route: ${route}`);
    }
  }

  for (const relativePath of generatedOutputFiles) {
    if (
      !sourceFiles.has(relativePath) &&
      !approvedGeneratedHtmlRoutes.has(relativePath) &&
      !approvedGeneratedAssetRoutes.has(relativePath)
    ) {
      unexpectedGeneratedOutput.push(relativePath);
      failures.push(`Unexpected generated output: ${relativePath}`);
    }
  }

  const approvedGeneratedRoutesFound = [...approvedGeneratedHtmlRoutes].filter((route) =>
    generatedHtmlRoutes.has(route),
  );
  const approvedGeneratedAssetsFound = [...approvedGeneratedAssetRoutes].filter((route) =>
    generatedOutputFiles.includes(route),
  );

  function printSummary(log = console.log) {
    log(`Legacy files checked: ${sourceFiles.size}`);
    log(`Legacy HTML routes checked: ${htmlRoutes.size}`);
    log(`Total generated HTML files: ${generatedHtmlRoutes.size}`);
    log(`Approved generated routes found: ${approvedGeneratedRoutesFound.length}`);
    log(`Approved generated design-system assets found: ${approvedGeneratedAssetsFound.length}`);
    log(`Unexpected generated routes found: ${unexpectedGeneratedRoutes.length}`);
    log(`Unexpected generated output found: ${unexpectedGeneratedOutput.length}`);
    log(`Missing legacy routes: ${missingLegacyRoutes.length}`);
    log(`Differing legacy files: ${differingLegacyFiles.length}`);
    log(`Missing legacy files: ${missingLegacyFiles.length}`);
    log(`Missing approved generated routes: ${missingApprovedGeneratedRoutes.length}`);
    log(`Missing approved generated design-system assets: ${missingApprovedGeneratedAssets.length}`);
  }

  if (failures.length > 0) {
    console.error("Legacy output validation failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    printSummary(console.error);
    process.exitCode = 1;
    return;
  }

  console.log("Legacy output validation passed.");
  printSummary();
  console.log("Copied legacy output matches current source byte-for-byte.");
  console.log("Approved generated design-system assets are present and no unexpected output was found.");
  console.log("Relative file paths are preserved in _site.");
}

main().catch((error) => {
  console.error("Unexpected validation error:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
