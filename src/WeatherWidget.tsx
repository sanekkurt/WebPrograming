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
const fetchData = async (
  currency: string,
  setTemp: (t: number) => void,
  setPrevious: (t: number) => void,
  setName: (t: string) => void
) => {
  if (currency.length < 3) return;
  // TODO выбрать любой api-сервис и заменить код запроса и обработки ответа
  // TODO обработка ошибок при выполнении запроса
  // TODO сделать индикатор выполнения запроса

  const url = `https://www.cbr-xml-daily.ru/daily_json.js`;
  const response = await fetch(url);
  const data = await response.json();
  const temp = data["Valute"][currency]["Value"];
  const previous = data["Valute"][currency]["Previous"];
  const name = data["Valute"][currency]["Name"];
  setTemp(temp);
  setPrevious(previous);
  setName(name);
};

const debouncedFetchData = debounce(fetchData, 500);

const WeatherWidget = () => {
  // Название валюты
  const [currency, setCurrency] = React.useState<string>(null);
  // Температура
  const [temp, setTemp] = React.useState<number>(null);

  const [previous, setPrevious] = React.useState<number>(null);

  const [name, setName] = React.useState<string>(null);

  React.useEffect(() => {
    debouncedFetchData(currency, setTemp, setPrevious, setName);
  }, [currency]); // При изменении названия валюты вызывается функция-эффект

  return (
    <Card>
      <CardHeader title="Валюта:" />
      <CardContent>
        <TextField
          label="Название валюты"
          value={currency || ""}
          onChange={e => setCurrency(e.target.value)}
        />
        <p />
        <Typography variant="h6">Цена: {temp}</Typography>
        <p />
        <Typography variant="h6">Старая цена: {previous}</Typography>
        <p />
        <Typography variant="h6">Имя валюты: {name}</Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
