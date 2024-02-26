import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface InstallmentPopoverProps {
  installment: number;
  netPrice: number;
}

const InstallmentPopover = (props: InstallmentPopoverProps) => {
  const { installment, netPrice } = props;
  let installments = [];

  for (let i = 1; i <= installment; i++) {
    const installmentValue = netPrice / i;
    installments.push(installmentValue);
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="link">Ver parcelas</Button>
      </PopoverTrigger>
      <PopoverContent>
        {installments.map((installmentValue, index) => {
          return (
            <div className="flex items-center justify-between" key={index}>
                <p>{index + 1}x</p>
                <p>{installmentValue.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                })}</p>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export { InstallmentPopover };
