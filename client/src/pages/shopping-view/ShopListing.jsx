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
import {fetchAllFilteredProducts, fetchProductDetails} from "@/store/shop/products-slice"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/ShoppingProductTile";
import { createSearchParams, useParams, useSearchParams } from "react-router-dom";
import ProductDetailDialog from "@/components/shopping-view/ProductDetailDialog";


const createSearchParamsHelper=(filterParams)=>{
const queryParams=[];

for(const [key,value] of Object.entries(filterParams)){
  // console.log(value ,"abc");
  
  if(Array.isArray(value) && value.length>0){
    const paramValue = value.join(',');
    queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)

  }
}
return queryParams.join('&')
  

}
function ShopListing() {
  const dispatch=useDispatch();
  const [filters,setFilters]=useState({});
  const [sort,setSort]=useState(null);
  const [searchParms,setSearchParms]=useSearchParams();
  const [openDetailsDialog,setOpenDetailsDialog]=useState(false);


  const {productList,productDetails}=useSelector(state=>state.shopProducts)
 
  const handelSort =(value)=>{
    // console.log(value,"value");
    setSort(value)
  }

  const handelFilter=(getSectionId,getCurrentOption)=>{
    console.log(getSectionId,getCurrentOption);

    let cpyFilters={...filters};
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    // console.log(indexOfCurrentSection);
    
    if(indexOfCurrentSection===-1){
      cpyFilters={
        ...cpyFilters,[getSectionId]:[getCurrentOption]
      }
    }else{
      const indexOfCurrentOption=cpyFilters[getSectionId].indexOf(getCurrentOption);
      
      if(indexOfCurrentOption===-1){
        cpyFilters[getSectionId].push(getCurrentOption);
      }else{
        cpyFilters[getSectionId].splice(indexOfCurrentOption,1)
      }
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters",JSON.stringify(cpyFilters))

  }
   useEffect(()=>{
    if(filters && Object.keys(filters).length>0){
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParms(new URLSearchParams(createQueryString))

    }

   },[filters])
  useEffect(()=>{
    setSort('price-lowtohigh');
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})

  },[])

  // fetch list of products
  useEffect(()=>{
    if(filters !== null && sort !==null ){
    dispatch(fetchAllFilteredProducts({filterParams:filters,sortParams:sort}))
    }
     
  },[dispatch,sort,filters])
    const handelGetProductDetails=(getCurrentProductId)=>{
      // console.log(getCurrentProductId);
      dispatch(fetchProductDetails(getCurrentProductId))
    }
    console.log(productDetails,'productDetails');
    useEffect(()=>{
      if(productDetails !==null) {
        setOpenDetailsDialog(true)
      }

    },[productDetails])

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 ">
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
            productList && productList.length >0 ? productList.map(productItem=> <ShoppingProductTile handelGetProductDetails={handelGetProductDetails} product={productItem}/>):null
          }
        </div>
      
      </div>
        <ProductDetailDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} product={productDetails} />
      
    </div>
  );
}

export default ShopListing;
