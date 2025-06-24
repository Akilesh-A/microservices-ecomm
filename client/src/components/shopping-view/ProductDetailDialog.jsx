import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator"
import * as Dialog from "@radix-ui/react-dialog";
import { StarIcon, X } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ProductDetailDialog = ({ open, setOpen, product }) => {
  if (!product) return null;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        {/* Overlay to dim the background */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />

        {/* Content centered in the screen */}
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-white rounded-lg shadow-lg z-50">
          {/* Close Button */}
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </Dialog.Close>

          {/* Product Image */}
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto max-h-[400px] object-contain rounded-md"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-extrabold capitalize">
              {product.title}
            </h2>
            <p className="text-gray-700 capitalize">{product.description}</p>
            <p className="text-lg font-bold text-gray-800-600">
              ₹{product.price}
            </p>
            {/* Optional CTA */}
            <div className="flex items-center gap-2 mt-2">
              <StarIcon className="w-5 h-5 fill-primary"> </StarIcon>
              <StarIcon className="w-5 h-5 fill-primary"> </StarIcon>
              <StarIcon className="w-5 h-5 fill-primary"> </StarIcon>
            </div>
            <span className="text-muted-foreground">(3.5)</span>
            <button className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-blue-700">
              Add to Cart
            </button>
            <Separator/>
            <div className="max-h-[300px] overflow-auto">
              <h2 className="text-xl font-bold">Reviews</h2>
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10  border rounded-full text-center">
                    <AvatarFallback className="w-10 h-10 rounded-full">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">Akilesh</h3>
                    </div>
                    <div className="flex items-center gap-0.5"></div>
                    <p className="text-muted-foreground">Awesome Product</p>
                  </div>
                </div>
                 <div className="flex gap-4">
                  <Avatar className="w-10 h-10  border rounded-full text-center">
                    <AvatarFallback className="w-10 h-10 rounded-full">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">Akilesh</h3>
                    </div>
                    <div className="flex items-center gap-0.5"></div>
                    <p className="text-muted-foreground">Awesome Product</p>
                  </div>
                </div>
                 <div className="flex gap-4">
                  <Avatar className="w-10 h-10  border rounded-full text-center">
                    <AvatarFallback className="w-10 h-10 rounded-full">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">Akilesh</h3>
                    </div>
                    <div className="flex items-center gap-0.5"></div>
                    <p className="text-muted-foreground">Awesome Product</p>
                  </div>
                </div>
                
                
              </div>
              <div className="mt-6 flex gap-2">
              <Input placeholder="Write a review .."/>
              <Button>Submit</Button>

              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProductDetailDialog;
