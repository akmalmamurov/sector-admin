import { OrderDataFull, UpdateOrderData } from "@/types";
import { FC, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useCurrentColor } from "@/hooks";
import classNames from "classnames";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/Lable";
import { priceFormat } from "@/utils";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useUpdateOrders } from "@/hooks/order/update-order";
import { format } from "date-fns";
import { DOMAIN } from "@/constants";

interface IModalProps {
  orderData: OrderDataFull;
  open: boolean;
  handleOpen: () => void;
}

const steps = [
  "Foydalanuvchi ma'lumotlari",
  "Mahsulotlar",
  "Buyurtma ma'lumotlari",
];

// Select opsiyalari uchun ro'yxatlar
const orderTypeOptions = [
  { value: "new", label: "Yangi" },
  { value: "old", label: "Eski" },
  { value: "rejected", label: "Bekor qilingan" },
];

const orderPriceStatusOptions = [
  { value: "paid", label: "To'langan" },
  { value: "not paid", label: "To'lanmagan" },
];

const deliveryMethodOptions = [
  { value: "Самовывоз", label: "O'zini olib ketish" },
  { value: "До адресса", label: "Manzilga yetkazish" },
];

const orderDeliveryTypeOptions = [
  { value: "not shipped", label: "Yuborilmagan" },
  { value: "shipped", label: "Yuborilgan" },
  { value: "in preparation", label: "Tayyorlanmoqda" },
];

const OrdersModal: FC<IModalProps> = ({ orderData, handleOpen, open }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useCurrentColor();
  const { mutate: updateOrders } = useUpdateOrders();

  const { register, handleSubmit, reset, control, setValue } = useForm<UpdateOrderData>({
    defaultValues: {
      orderType: "",
      paymentMethod: "",
      orderPriceStatus: "",
      deliveryMethod: "",
      orderDeleveryType: "",
      comment: "",
      validStartDate: undefined,
      validEndDate: undefined,
      deletedAt: undefined,
    },
  });

  // orderData o'zgarganda formani to'ldirish
  useEffect(() => {
    if (orderData) {
      setValue("orderType", orderData.orderType);
      setValue("paymentMethod", orderData.paymentMethod);
      setValue("orderPriceStatus", orderData.orderPriceStatus);
      setValue("deliveryMethod", orderData.deliveryMethod);
      setValue("orderDeleveryType", orderData.orderDeleveryType);
      setValue("comment", orderData.comment);
      setValue(
        "validStartDate",
        orderData.validStartDate ? new Date(orderData.validStartDate) : undefined
      );
      setValue(
        "validEndDate",
        orderData.validEndDate ? new Date(orderData.validEndDate) : undefined
      );
      setValue("deletedAt", undefined);
    }
  }, [orderData, setValue]);

  const handleClose = () => {
    setActiveStep(0);
    handleOpen();
    // reset({
    //   orderType: "",
    //   paymentMethod: "",
    //   orderPriceStatus: "",
    //   deliveryMethod: "",
    //   orderDeleveryType: "",
    //   comment: "",
    //   validStartDate: undefined,
    //   validEndDate: undefined,
    //   deletedAt: undefined,
    // });
  };

  const onSubmit = async (formValues: UpdateOrderData) => {
    setIsSubmitting(true);
    try {
      const updatedFields: Partial<UpdateOrderData> = {};

      if (formValues.orderType !== orderData.orderType) {
        updatedFields.orderType = formValues.orderType;
      }
      if (formValues.paymentMethod !== orderData.paymentMethod) {
        updatedFields.paymentMethod = formValues.paymentMethod;
      }
      if (formValues.orderPriceStatus !== orderData.orderPriceStatus) {
        updatedFields.orderPriceStatus = formValues.orderPriceStatus;
      }
      if (formValues.deliveryMethod !== orderData.deliveryMethod) {
        updatedFields.deliveryMethod = formValues.deliveryMethod;
      }
      if (formValues.orderDeleveryType !== orderData.orderDeleveryType) {
        updatedFields.orderDeleveryType = formValues.orderDeleveryType;
      }
      if (formValues.comment !== orderData.comment) {
        updatedFields.comment = formValues.comment;
      }

      // Sanalarni millisekund formatida solishtiramiz
      if (formValues.validStartDate !== undefined) {
        const formStart = formValues.validStartDate ? new Date(formValues.validStartDate).getTime() : null;
        const originalStart = orderData.validStartDate ? new Date(orderData.validStartDate).getTime() : null;
        if (formStart !== originalStart) {
          updatedFields.validStartDate = formValues.validStartDate ? new Date(formValues.validStartDate) : undefined;
        }
      }

      if (formValues.validEndDate !== undefined) {
        const formEnd = formValues.validEndDate ? new Date(formValues.validEndDate).getTime() : null;
        const originalEnd = orderData.validEndDate ? new Date(orderData.validEndDate).getTime() : null;
        if (formEnd !== originalEnd) {
          updatedFields.validEndDate = formValues.validEndDate ? new Date(formValues.validEndDate) : undefined;
        }
      }

      if (Object.keys(updatedFields).length === 0) {
        console.log("Hech qanday o'zgarish yo'q. Update qilinmaydi.");
        handleClose();
        return;
      }

      updateOrders({ id: orderData.id, data: updatedFields });
      handleClose();
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={classNames(
          theme.bg,
          "flex flex-col py-6 px-8 max-w-5xl h-[calc(100vh-80px)] overflow-y-auto rounded-lg"
        )}
      >
        <DialogHeader>
          <DialogTitle className={classNames(theme.text, "text-2xl font-semibold")}>
            Buyurtma #{orderData?.orderNumber}
          </DialogTitle>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </DialogHeader>

        <DialogDescription className="hidden">
          Buyurtma ma'lumotlarni ko'rish va tahrirlash
        </DialogDescription>

        <div className="flex gap-3 border-b border-gray-200 pb-2 mt-4">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={classNames(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activeStep === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {step}
            </button>
          ))}
        </div>

        <div className="mt-6 flex-1">
          {activeStep === 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span>👤</span> Foydalanuvchi ma'lumotlari
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="space-y-1">
                  <Label className="font-semibold text-gray-700">Ism:</Label>
                  <p className="text-gray-600">{orderData?.user?.name || "Mavjud emas"}</p>
                </div>
                <div className="space-y-1">
                  <Label className="font-semibold text-gray-700">Email:</Label>
                  <p className="text-gray-600">{orderData?.user?.email || "Mavjud emas"}</p>
                </div>
                <div className="space-y-1">
                  <Label className="font-semibold text-gray-700">Telefon:</Label>
                  <p className="text-gray-600">{orderData?.phone || "Mavjud emas"}</p>
                </div>
                <div className="space-y-1">
                  <Label className="font-semibold text-gray-700">To'liq ism:</Label>
                  <p className="text-gray-600">{orderData?.fullname || "Mavjud emas"}</p>
                </div>
              </div>

              <div className="border border-gray-200 p-6 rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                <h4 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
                  <span>🏢</span> Kontragent
                </h4>
                {orderData?.kontragent ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="font-semibold text-gray-700">Nomi:</Label>
                      <p className="text-gray-600">{orderData.kontragent.name || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="font-semibold text-gray-700">Tashkilot shakli:</Label>
                      <p className="text-gray-600">{orderData.kontragent.ownershipForm || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="font-semibold text-gray-700">INN:</Label>
                      <p className="text-gray-600">{orderData.kontragent.inn || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="font-semibold text-gray-700">PINFL:</Label>
                      <p className="text-gray-600">{orderData.kontragent.pinfl || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="font-semibold text-gray-700">Yuridik manzil:</Label>
                      <p className="text-gray-600">{orderData.kontragent.legalAddress || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="font-semibold text-gray-700">Ro'yxatdan o'tgan davlat:</Label>
                      <p className="text-gray-600">{orderData.kontragent.countryOfRegistration || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="font-semibold text-gray-700">OKED:</Label>
                      <p className="text-gray-600">{orderData.kontragent.oked || "-"}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">-</p>
                )}
              </div>
            </div>
          )}

              {activeStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span>📦</span> Mahsulotlar
                  </h3>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-gray-800">Mahsulotlar</h4>
                    {orderData?.products?.map((product, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-200 p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {/* Rasm */}
                          <div className="flex items-center justify-center sm:justify-start">
                            {product.product.mainImage ? (
                              <img
                                src={`${DOMAIN}/${product.product.mainImage}`}
                                alt={product.product.title}
                                className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-md shadow-sm border border-gray-100 p-2 bg-white"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder-image.png";
                                }}
                              />
                            ) : (
                              <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center bg-gray-100 rounded-md shadow-sm border border-gray-200">
                                <span className="text-gray-400 text-sm">Rasm yo'q</span>
                              </div>
                            )}
                          </div>

                          {/* Ma'lumotlar */}
                          <div className="sm:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label className="font-semibold text-gray-700">Mahsulot nomi:</Label>
                              <p className="text-gray-600 text-sm">{product?.product?.title}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="font-semibold text-gray-700">Narxi:</Label>
                              <p className="text-blue-600 font-semibold text-sm">
                                {product.price.toLocaleString()} so'm
                              </p>
                            </div>
                            <div className="space-y-1">
                              <Label className="font-semibold text-gray-700">Soni:</Label>
                              <p className="text-gray-600 text-sm">{product.count}</p>
                            </div>
                            {product.garantee && (
                              <div className="space-y-1">
                                <Label className="font-semibold text-gray-700">Garantiya:</Label>
                                <p className="text-gray-600 text-sm">
                                  {product.garantee.title} ({product.garantee.price} so'm)
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Umumiy xarajatlar */}
                    <div className="flex justify-center items-center p-8 border border-gray-200 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                      <p className="text-lg font-semibold text-gray-800">
                        <span className="text-blue-600">Hamma xarajatlar:</span>{" "}
                        <span className="text-blue-700">{priceFormat(orderData.total)} so'm</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}


          {activeStep === 2 && (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span>📝</span> Buyurtma ma'lumotlarini yangilash
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orderType">Buyurtma turi</Label>
                  <Controller
                    name="orderType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-md px-3 text-gray-800 focus:ring-blue-500">
                          <SelectValue placeholder="Buyurtma turini tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          {orderTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="paymentMethod">To'lov usuli</Label>
                  <Input
                    id="paymentMethod"
                    placeholder="To'lov usuli"
                    {...register("paymentMethod")}
                    className="border border-gray-300 rounded-md px-3 text-gray-800 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="orderPriceStatus">Narx holati</Label>
                  <Controller
                    name="orderPriceStatus"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-md px-3 text-gray-800 focus:ring-blue-500">
                          <SelectValue placeholder="Narx holatini tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          {orderPriceStatusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="deliveryMethod">Yetkazib berish usuli</Label>
                  <Controller
                    name="deliveryMethod"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-md px-3 text-gray-800 focus:ring-blue-500">
                          <SelectValue placeholder="Yetkazib berish usulini tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          {deliveryMethodOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="orderDeliveryType">Yetkazib berish turi</Label>
                  <Controller
                    name="orderDeleveryType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-md px-3 text-gray-800 focus:ring-blue-500">
                          <SelectValue placeholder="Yetkazib berish turini tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          {orderDeliveryTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="validStartDate">Boshlanish sanasi</Label>
                  <Controller
                    control={control}
                    name="validStartDate"
                    render={({ field }) => (
                      <Input
                        id="validStartDate"
                        type="datetime-local"
                        value={field.value ? format(field.value, "yyyy-MM-dd'T'HH:mm") : ""}
                        onChange={(e) =>
                          field.onChange(e.target.value ? new Date(e.target.value) : undefined)
                        }
                        className="border border-gray-300 rounded-md px-3 text-gray-800 focus:ring-blue-500"
                      />
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="validEndDate">Tugash sanasi</Label>
                  <Controller
                    control={control}
                    name="validEndDate"
                    render={({ field }) => (
                      <Input
                        id="validEndDate"
                        type="datetime-local"
                        value={field.value ? format(field.value, "yyyy-MM-dd'T'HH:mm") : ""}
                        onChange={(e) =>
                          field.onChange(e.target.value ? new Date(e.target.value) : undefined)
                        }
                        className="border border-gray-300 rounded-md px-3 text-gray-800 focus:ring-blue-500"
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="comment">Izoh</Label>
                <Textarea
                  id="comment"
                  placeholder="Izoh"
                  {...register("comment")}
                  className="border border-gray-300 rounded-md px-3 text-gray-800 mt-1 focus:ring-blue-500"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrdersModal;