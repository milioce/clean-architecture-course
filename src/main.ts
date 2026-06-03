import { CompositionRoot } from "./composition-root";

function main() {

  const presenter = CompositionRoot.createUserPresenter();

  presenter.init();
}

main()
