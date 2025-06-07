import ProductFilter from "@/components/shopping-view/ProductFilter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";

import { ArrowUpDown } from "lucide-react";
import {fetchAllFilteredProducts} from "@/store/shop/products-slice"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/ShoppingProductTile";

function ShopListing() {
  const dispatch=useDispatch();
  const [filters,setFilters]=useState(null);
  const [sort,setSort]=useState(null)

  const {productList}=useSelector(state=>state.shopProducts)
 
  const handelSort =(value)=>{
    // console.log(value,"value");
    setSort(value)
  }

  const handelFilter=(getSectionId,getCurrentOption)=>{
    console.log(getSectionId,getCurrentOption);
    


  }

  // fetch list of products
  useEffect(()=>{
      dispatch(fetchAllFilteredProducts())
  },[dispatch])

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 ">
      <ProductFilter filters={filters} handelFilter={handelFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground font-bold">{'Total Products :' + productList.length }</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handelSort}>
                  {sortOptions.map(sortItem=><DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>)}
                </DropdownMenuRadioGroup>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {
            productList && productList.length >0 ? productList.map(productItem=> <ShoppingProductTile product={productItem}/>):null
          }


        </div>
      </div>
    </div>
  );
}

export default ShopListing;
