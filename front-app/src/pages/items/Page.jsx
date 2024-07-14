import { Breadcrumb } from "../../components/commons";
import { useItems } from "./../../hooks";
import { ItemList } from "./components/ItemsList/ItemList";
const Page = () => {

  const { items,isLoading } = useItems({limit:4});

  return (
    <div>
      <Breadcrumb categories={items?.categories || []} />
      <ItemList items={items?.items || []} isLoading={isLoading}/>
    </div>
  );
};
export default Page;
