import fs from 'node:fs'
import { resolveConfig } from 'prettier'
import type { RemoveTypeOptions } from './transform'
import { removeMagicComments, transform } from './transform'

const { readFile, writeFile } = fs.promises

/**
 * Transform the input file and write the output to another file
 * @param inputFileName
 * @param outputFileName
 */
export async function transformFile(
  inputFileName: string,
  outputFileName: string,
  options: RemoveTypeOptions = {},
): Promise<void> {
  const code = await readFile(inputFileName, 'utf-8')
  const prettierOptions = await resolveConfig(inputFileName)
  const output = await transform(code, inputFileName, {
    prettierOptions,
    ...options,
  })
  await writeFile(outputFileName, output, 'utf-8')
}

/**
 * Remove magic comments from the input file and write the output to another file
 * @param inputFileName
 * @param outputFileName
 */
export async function removeMagicCommentsFromFile(
  inputFileName: string,
  outputFileName: string,
): Promise<void> {
  const code = await readFile(inputFileName, 'utf-8')
  const prettierConfig = await resolveConfig(inputFileName)
  const output = await removeMagicComments(code, inputFileName, prettierConfig)
  await writeFile(outputFileName, output, 'utf-8')
}
