import { UserTerminal } from "./presentation/UserTerminal";

async function main() {

  const terminal = new UserTerminal();
  await terminal.init();
}

main();
