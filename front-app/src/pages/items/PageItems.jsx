import { Breadcrumb } from "../../components/commons";
import { useItems } from "../../hooks";
import { ItemList } from "./components/ItemsList/ItemList";
const PageItems = () => {
  const { items, isLoading } = useItems();
  
  return (
    <>
      <Breadcrumb categories={items?.categories || []} />
      <ItemList items={items?.items || []} isLoading={isLoading} />
    </>
  );
};
export default PageItems;
