import { OrderDataFull, UpdateOrderData } from "@/types";
import { FC, useState } from "react";
import {  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "../ui/dialog";
import { useCurrentColor } from "@/hooks";
import classNames from "classnames";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/Lable";
import { format } from "date-fns";
import { priceFormat } from "@/utils";
import { useForm } from "react-hook-form";

interface IModalProps {
  orderData: OrderDataFull;
  open: boolean;
  handleOpen: () => void;
}

const steps = [
  "Foydalanuvchi ma'lumotlari",
  "Mahsulot va kontragent",
  "Buyurtma ma'lumotlari",
];

const OrdersModal: FC<IModalProps> = ({ orderData, handleOpen, open }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useCurrentColor();



  const { register,  handleSubmit, formState: { errors },  watch  } = useForm<UpdateOrderData>({
    defaultValues: {
      orderType: orderData?.orderType || "",
      paymentMethod: orderData?.paymentMethod || "",
      orderPriceStatus: orderData?.orderPriceStatus || "",
      deliveryMethod: orderData?.deliveryMethod || "",
      orderDeliveryType: orderData?.orderDeleveryType || "", // Note: Typo in interface (orderDeleveryType → orderDeliveryType)
      comment: orderData?.comment || "",
      validStartDate: orderData?.validStartDate
        ? new Date(orderData.validStartDate).toISOString().slice(0, 16)
        : "",
      validEndDate: orderData?.validEndDate
        ? new Date(orderData.validEndDate).toISOString().slice(0, 16)
        : "",
      deletedAt: undefined,
    },
  });

  const onSubmit = async (data: UpdateOrderData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call (replace with your actual API logic)
      console.log("Submitting form:", data);
      handleOpen(); // Close modal on success
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: string | Date) =>
    format(new Date(date), "dd.MM.yyyy HH:mm");

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
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
            onClick={handleOpen}
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
              <h3 className="text-xl font-bold text-gray-800">
                👤 Foydalanuvchi ma'lumotlari
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <Label className="font-semibold">Ism:</Label>
                  <p>{orderData?.user?.name || "Mavjud emas"}</p>
                </div>
                <div>
                  <Label className="font-semibold">Email:</Label>
                  <p>{orderData?.user?.email || "Mavjud emas"}</p>
                </div>
                <div>
                  <Label className="font-semibold">Telefon:</Label>
                  <p>{orderData?.phone || "Mavjud emas"}</p>
                </div>
                <div>
                  <Label className="font-semibold">To'liq ism:</Label>
                  <p>{orderData?.fullname || "Mavjud emas"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Products and Kontragent */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">
                📦 Mahsulotlar va 🏢 Kontragent
              </h3>

              {/* Products */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Mahsulotlar</h4>
                {orderData?.products?.map((product, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-semibold">Mahsulot nomi:</Label>
                        <p>{product?.product?.title}</p>
                      </div>
                      <div>
                        <Label className="font-semibold">Narxi:</Label>
                        <p>{product.price.toLocaleString()} so'm</p>
                      </div>
                      <div>
                        <Label className="font-semibold">Soni:</Label>
                        <p>{product.count}</p>
                      </div>
                      {product.garantee && (
                        <div>
                          <Label className="font-semibold">Garantiya:</Label>
                          <p>
                            {product.garantee.title} ({product.garantee.price} so'm)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                    <div>
                        <p>Hamma xarajatlar: {priceFormat(orderData.total)} sum</p>
                    </div>
              </div>

              {/* Kontragent */}
              <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm">
                <h4 className="font-semibold text-lg mb-2">🏢 Kontragent</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Nomi:</Label>
                    <p>{orderData.kontragentName || "Mavjud emas"}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">ID:</Label>
                    <p>{orderData.contrAgentId}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Order Details */}
        {activeStep === 2 && (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-xl font-bold text-gray-800">
                📝 Buyurtma ma'lumotlarini yangilash
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orderType">Buyurtma turi</Label>
                  <Input
                    id="orderType"
                    placeholder="Buyurtma turi"
                    {...register("orderType", { required: "Buyurtma turi kiritilishi shart" })}
                    className={classNames("mt-1", { "border-red-500": errors.orderType })}
                  />
                  {errors.orderType && (
                    <p className="text-red-500 text-sm mt-1">{errors.orderType.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="paymentMethod">To'lov usuli</Label>
                  <Input
                    id="paymentMethod"
                    placeholder="To'lov usuli"
                    {...register("paymentMethod")}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="orderPriceStatus">Narx holati</Label>
                  <Input
                    id="orderPriceStatus"
                    placeholder="Narx holati (not paid / paid)"
                    {...register("orderPriceStatus", {
                      required: "Narx holati kiritilishi shart",
                      pattern: {
                        value: /^(paid|not paid)$/,
                        message: "Faqat 'paid' yoki 'not paid' kiritilishi mumkin",
                      },
                    })}
                    className={classNames("mt-1", { "border-red-500": errors.orderPriceStatus })}
                  />
                  {errors.orderPriceStatus && (
                    <p className="text-red-500 text-sm mt-1">{errors.orderPriceStatus.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="deliveryMethod">Yetkazib berish usuli</Label>
                  <Input
                    id="deliveryMethod"
                    placeholder="Yetkazib berish usuli"
                    {...register("deliveryMethod", {
                      required: "Yetkazib berish usuli kiritilishi shart",
                    })}
                    className={classNames("mt-1", { "border-red-500": errors.deliveryMethod })}
                  />
                  {errors.deliveryMethod && (
                    <p className="text-red-500 text-sm mt-1">{errors.deliveryMethod.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="orderDeliveryType">Yetkazib berish turi</Label>
                  <Input
                    id="orderDeliveryType"
                    placeholder="Yetkazib berish turi"
                    {...register("orderDeliveryType", {
                      required: "Yetkazib berish turi kiritilishi shart",
                    })}
                    className={classNames("mt-1", { "border-red-500": errors.orderDeliveryType })}
                  />
                  {errors.orderDeliveryType && (
                    <p className="text-red-500 text-sm mt-1">{errors.orderDeliveryType.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="validStartDate">Boshlanish sanasi</Label>
                  <Input
                    id="validStartDate"
                    type="datetime-local"
                    {...register("validStartDate", {
                      required: "Boshlanish sanasi kiritilishi shart",
                    })}
                    className={classNames("mt-1", { "border-red-500": errors.validStartDate })}
                  />
                  {errors.validStartDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.validStartDate.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="validEndDate">Tugash sanasi</Label>
                  <Input
                    id="validEndDate"
                    type="datetime-local"
                    {...register("validEndDate", {
                      required: "Tugash sanasi kiritilishi shart",
                      validate: (value) => {
                        const startDate = watch("validStartDate");
                        if (!startDate || !value) return true;
                        return new Date(value as string) > new Date(startDate as string) || "Tugash sanasi boshlanish sanasidan keyin bo'lishi kerak";
                      }
                    })}
                    className={classNames("mt-1", { "border-red-500": errors.validEndDate })}
                  />
                  {errors.validEndDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.validEndDate.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="comment">Kommentariya</Label>
                <Textarea
                  id="comment"
                  placeholder="Kommentariya"
                  {...register("comment")}
                  className="mt-1"
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