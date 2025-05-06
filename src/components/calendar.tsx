"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Tipo para os feriados
type Holiday = {
  date: string; // formato: 'YYYY-MM-DD'
  name: string;
  type: "nacional" | "estadual";
};

// Lista de feriados nacionais e estaduais de São Paulo
const holidays: Holiday[] = [
  // Feriados Nacionais
  { date: "2025-01-01", name: "Confraternização Universal", type: "nacional" },
  { date: "2025-02-17", name: "Carnaval", type: "nacional" },
  { date: "2025-02-18", name: "Carnaval", type: "nacional" },
  { date: "2025-04-18", name: "Sexta-feira Santa", type: "nacional" },
  { date: "2025-04-20", name: "Páscoa", type: "nacional" },
  { date: "2025-04-21", name: "Tiradentes", type: "nacional" },
  { date: "2025-05-01", name: "Dia do Trabalho", type: "nacional" },
  { date: "2025-06-19", name: "Corpus Christi", type: "nacional" },
  { date: "2025-09-07", name: "Independência do Brasil", type: "nacional" },
  { date: "2025-10-12", name: "Nossa Senhora Aparecida", type: "nacional" },
  { date: "2025-11-02", name: "Finados", type: "nacional" },
  { date: "2025-11-15", name: "Proclamação da República", type: "nacional" },
  { date: "2025-12-25", name: "Natal", type: "nacional" },

  // Feriados Estaduais de São Paulo
  { date: "2025-01-25", name: "Aniversário de São Paulo", type: "estadual" },
  {
    date: "2025-07-09",
    name: "Revolução Constitucionalista",
    type: "estadual",
  },
  { date: "2025-11-20", name: "Consciência Negra", type: "estadual" },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Array<Date | null>>([]);

  // Nomes dos meses em português
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Nomes dos dias da semana em português
  const weekdayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // Função para gerar os dias do calendário
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Primeiro dia do mês
    const firstDayOfMonth = new Date(year, month, 1);
    // Último dia do mês
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Dia da semana do primeiro dia (0 = Domingo, 6 = Sábado)
    const firstDayWeekday = firstDayOfMonth.getDay();

    // Total de dias no mês
    const daysInMonth = lastDayOfMonth.getDate();

    // Array para armazenar os dias do calendário
    const days: Array<Date | null> = [];

    // Adicionar dias vazios antes do primeiro dia do mês
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(null);
    }

    // Adicionar os dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    // Adicionar dias vazios para completar a última semana
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        days.push(null);
      }
    }

    return days;
  };

  // Função para verificar se uma data é feriado
  const isHoliday = (date: Date): Holiday | null => {
    if (!date) return null;

    const dateString = date.toISOString().split("T")[0];
    const holiday = holidays.find((h) => h.date === dateString);

    return holiday || null;
  };

  // Função para navegar para o mês anterior
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Função para navegar para o próximo mês
  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Atualizar os dias do calendário quando a data atual mudar
  useEffect(() => {
    setCalendarDays(generateCalendarDays(currentDate));
  }, [currentDate]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <button
          onClick={goToNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          aria-label="Próximo mês"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Cabeçalho dos dias da semana */}
        {weekdayNames.map((day, index) => (
          <div
            key={index}
            className="text-center font-medium py-2 text-gray-600"
          >
            {day}
          </div>
        ))}

        {/* Dias do calendário */}
        {calendarDays.map((day, index) => {
          const holiday = day ? isHoliday(day) : null;

          return (
            <div
              key={index}
              className={`
                h-16 p-1 border border-gray-200 rounded-md
                ${!day ? "bg-gray-50" : "hover:bg-gray-50"}
                ${holiday?.type === "nacional" ? "bg-red-50" : ""}
                ${holiday?.type === "estadual" ? "bg-blue-50" : ""}
              `}
            >
              {day && (
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-start">
                    <span
                      className={`
                      text-sm font-medium
                      ${day.getDay() === 0 ? "text-red-500" : "text-gray-700"}
                    `}
                    >
                      {day.getDate()}
                    </span>

                    {holiday && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info
                              className={`
                                h-4 w-4
                                ${
                                  holiday.type === "nacional"
                                    ? "text-red-500"
                                    : "text-blue-500"
                                }
                              `}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{holiday.name}</p>
                            <p className="text-xs text-gray-500 capitalize">
                              Feriado {holiday.type}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>

                  {holiday && (
                    <div className="mt-1 text-xs overflow-hidden text-ellipsis">
                      <span
                        className={`
                        ${
                          holiday.type === "nacional"
                            ? "text-red-600"
                            : "text-blue-600"
                        }
                      `}
                      >
                        {holiday.name}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex gap-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-50 border border-red-200 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Feriado Nacional</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Feriado Estadual (SP)</span>
        </div>
      </div>
    </div>
  );
}
