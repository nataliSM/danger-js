// Because we don't get to use the d.ts, we can pass in a subset here.
import {DangerDSL} from "./source/dsl/DangerDSL"
declare var danger: DangerDSL
declare function warn(params: string): void
declare function fail(params: string): void

import * as fs from "fs"

import * as includesOriginal from "lodash.includes"
// For some reason we're getting type errors on this includes module?
// Wonder if we could move to the includes function in ES2015?
const includes = includesOriginal as Function

// Request a CHANGELOG entry if not declared #trivial
const hasChangelog = includes(danger.git.modified_files, "changelog.md")
const isTrivial = includes((danger.github.pr.body + danger.github.pr.title), "#trivial")
if (!hasChangelog && !isTrivial) {
  warn("Please add a changelog entry for your changes.")

  // Politely ask for their name on the entry too
  const changelogDiff = danger.git.diffForFile("changelog.md")
  const contributorName = danger.github.pr.user.login
  if (changelogDiff && !includes(changelogDiff, contributorName)) {
    warn("Please add your GitHub name to the changelog entry, so we can attribute you.")
  }
}

// Warns if there are changes to package.json without changes to yarn.lock.
const packageChanged = includes(danger.git.modified_files, "package.json")
const lockfileChanged = includes(danger.git.modified_files, "yarn.lock")
if (packageChanged && !lockfileChanged) {
  const message = "Changes were made to package.json, but not to yarn.lock"
  const idea = "Perhaps you need to run `yarn install`?"
  warn(`${message} - <i>${idea}</i>`)
}

import dtsGenerator from "./scripts/danger-dts"
const currentDTS = dtsGenerator()
const savedDTS = fs.readFileSync("source/danger.d.ts").toString()
if (currentDTS !== savedDTS) {
  const message = "There are changes to the Danger DSL which are not reflected in the current danger.d.ts."
  const idea = "Please run <code>yarn declarations</code> and update this PR."
  fail(`${message} - <i>${idea}</i>`)
}
