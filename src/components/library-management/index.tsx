import Listing from "./Listing/Listing";
import Create from "./create/create";

function Library() {
  return (
    <div data-testid="library">
      <h1>Library management</h1>
      <Create />
      <Listing />
    </div>
  );
}

export default Library;
