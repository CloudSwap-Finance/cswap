import React, { useState } from "react";
import Box from "../Box/Box";
import BalanceInput from "./BalanceInput";
import TextFieldComp from "./TextField";

export default {
  title: "Components/BalanceInput",
  component: BalanceInput,
  argTypes: {},
};

export const Default: React.FC = () => {
  const [decimalValue, setDecimalValue] = useState(1.43333);
  const [numericValue, setNumericValue] = useState(5);

  const currencyValue = (input: number) => {
    return `~${(input * 1.3).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USD`;
  };

  const handleDecimalChange = (input) => {
    setDecimalValue(input);
  };

  const handleNumericChange = (input) => {
    setNumericValue(input);
  };

  return (
    <Box width="300px">
      <BalanceInput
        onUserInput={handleDecimalChange}
        value={decimalValue}
        currencyValue={currencyValue(decimalValue)}
        placeholder="0.0"
        mb="32px"
      />
      <BalanceInput
        value={decimalValue * 1.5}
        onUserInput={handleDecimalChange}
        currencyValue={currencyValue(decimalValue * 1.5)}
        placeholder="1.5"
        isWarning
        mb="32px"
      />
      <BalanceInput
        value={numericValue}
        onUserInput={handleNumericChange}
        inputProps={{ inputMode: "numeric" }}
        currencyValue={currencyValue(numericValue)}
        placeholder="0"
        mb="32px"
      />
    </Box>
  );
};

export const UnitDisplay: React.FC = () => {
  const CSWAP_PRICE = 69;
  const [cswapValue, setCswapValue] = useState("1006.086956");

  const cswapToUSD = (input: string) => {
    const convertedToUSD = parseFloat(input) * CSWAP_PRICE;
    return `~${convertedToUSD.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USD`;
  };

  const handleCswapChange = (input: string) => {
    setCswapValue(input);
  };

  return (
    <>
      <Box width="300px" mb="24px">
        <BalanceInput
          onUserInput={handleCswapChange}
          value={cswapValue}
          currencyValue={cswapToUSD(cswapValue)}
          placeholder="0.0"
          unit="CSWAP"
        />
      </Box>
      {/* Long token names with spaces */}
      <Box width="300px">
        <BalanceInput
          onUserInput={handleCswapChange}
          value={cswapValue}
          currencyValue="2854.66 BADGER-HOTCROSS LP"
          placeholder="0.0"
          unit="CSWAP-CRO LP"
        />
      </Box>
    </>
  );
};

export const SwitchUnits: React.FC = () => {
  const CSWAP_PRICE = 69;
  const [editingUnit, setEditingUnit] = useState<"CSWAP" | "USD">("CSWAP");
  const conversionUnit = editingUnit === "CSWAP" ? "USD" : "CSWAP";
  const [values, setValues] = useState({
    CSWAP: "1006.086957",
    USD: `${1006.086957 * CSWAP_PRICE}`,
  });

  const currencyValue = !Number.isNaN(parseFloat(values[conversionUnit]))
    ? parseFloat(values[conversionUnit]).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";

  const switchEditingUnits = () => {
    const editingUnitAfterChange = editingUnit === "CSWAP" ? "USD" : "CSWAP";
    // This is needed to persist same value as shown for currencyValue after switching
    // otherwise user will see lots of decimals
    const valuesAfterChange = { ...values };
    valuesAfterChange[editingUnitAfterChange] = !Number.isNaN(parseFloat(values[conversionUnit]))
      ? parseFloat(values[conversionUnit]).toFixed(2)
      : "0.00";
    setValues(valuesAfterChange);
    setEditingUnit(editingUnitAfterChange);
  };

  const handleCswapChange = (input: string) => {
    const inputAsFloat = parseFloat(input);
    if (editingUnit === "CSWAP") {
      setValues({
        CSWAP: input,
        USD: Number.isNaN(inputAsFloat) ? "" : `${inputAsFloat * CSWAP_PRICE}`,
      });
    } else {
      setValues({
        CSWAP: Number.isNaN(inputAsFloat) ? "" : `${inputAsFloat / CSWAP_PRICE}`,
        USD: input,
      });
    }
  };

  return (
    <Box width="300px">
      <BalanceInput
        onUserInput={handleCswapChange}
        value={values[editingUnit]}
        currencyValue={`~${currencyValue} ${conversionUnit}`}
        placeholder="0.0"
        unit={editingUnit}
        isWarning={!values[editingUnit] || parseFloat(values[editingUnit]) <= 0}
        switchEditingUnits={switchEditingUnits}
      />
    </Box>
  );
};

export const Textfield: React.FC = () => {
  const [value, setValue] = useState("");

  return (
    <Box width="300px">
      <TextFieldComp label="Label" value={value} placeholder="Placeholder" onUserInput={setValue} />
    </Box>
  );
};
