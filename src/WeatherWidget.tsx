import * as React from "react";
import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  Typography
} from "@material-ui/core";
import { debounce } from "ts-debounce";

// Процедура выполнения и обработки результатов запроса на внешний ресурс

const WeatherWidget = () => {
  // Название валюты
  const [currency, setCurrency] = React.useState<string>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(null);
  // Температура
  const [temp, setTemp] = React.useState<number>(null);

  const [previous, setPrevious] = React.useState<number>(null);

  const [name, setName] = React.useState<string>(null);

  const [error, setError] = React.useState<string>(null);

  const debouncedFetchData = React.useMemo(
    () =>
      debounce(async (currency: string) => {
        if (currency.length < 3) return;
        // TODO обработка ошибок при выполнении запроса
        // TODO сделать индикатор выполнения запроса
        try {
          const url = `https://www.cbr-xml-daily.ru/daily_json.js`;
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);
          var temp = 0;
          var previous = 0;
          var name = "-";
          var error = undefined;
          if (data["Valute"][currency] === undefined) {
            temp = undefined;
            previous = undefined;
            name = undefined;
            error = "Введите верную валюту";
          } else {
            temp = data["Valute"][currency]["Value"];
            previous = data["Valute"][currency]["Previous"];
            name = data["Valute"][currency]["Name"];
            error = undefined;
          }

          setTemp(temp);
          setPrevious(previous);
          setName(name);
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }, 500),
    []
  );

  React.useEffect(() => {
    debouncedFetchData(currency);
  }, [currency]); // При изменении названия валюты вызывается функция-эффект

  return (
    <Card>
      <CardHeader title="Валюта:" />
      <CardContent>
        <TextField
          label="Название валюты"
          value={currency || ""}
          onChange={e => {
            setIsLoading(true);
            setCurrency(e.target.value);
          }}
        />
        {isLoading && <h2>Loading...</h2>}
        <p />
        <Typography variant="h6">Цена: {temp}</Typography>
        <p />
        <Typography variant="h6">Старая цена: {previous}</Typography>
        <p />
        <Typography variant="h6">Имя валюты: {name}</Typography>
        <p />
        <Typography variant="h6">{error}</Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
