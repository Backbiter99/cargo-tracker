import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CurrentETA({
    eta,
    setEta,
}: {
    eta: string;
    setEta: (arg: string) => void;
}) {
    // Change your useState for eta to also track the selected Date object
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        undefined
    );

    // Add this function to handle date selection
    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setSelectedDate(date);
            // Convert to ISO string format needed for your API
            setEta(date.toISOString());
        }
    };
    return (
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="eta">ETA:</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="eta"
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                            format(selectedDate, "PPP HH:mm")
                        ) : (
                            <span>Select Date & Time</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto p-0 max-h-[30vh] overflow-y-auto"
                    align="start"
                >
                    <Calendar
                        className="w-full"
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                            if (date) {
                                // Preserve time if already selected
                                if (selectedDate) {
                                    date.setHours(selectedDate.getHours());
                                    date.setMinutes(selectedDate.getMinutes());
                                    date.setSeconds(selectedDate.getSeconds());
                                }
                                handleDateSelect(date);
                            }
                        }}
                        initialFocus
                    />
                    <div className="p-3 border-t border-border">
                        <div className="flex justify-between items-center gap-0.5">
                            <div className="text-sm font-medium">
                                Time (24 Hour Clock):
                            </div>
                            <div className="flex items-center space-x-2">
                                {/* Hours */}
                                <div className="flex flex-col items-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => {
                                            if (!selectedDate) {
                                                const now = new Date();
                                                handleDateSelect(now);
                                                return;
                                            }

                                            const newDate = new Date(
                                                selectedDate
                                            );
                                            const currentHour =
                                                newDate.getHours();
                                            newDate.setHours(
                                                (currentHour + 1) % 24
                                            );
                                            handleDateSelect(newDate);
                                        }}
                                    >
                                        <span className="sr-only">
                                            Increase hour
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4"
                                        >
                                            <path d="m18 15-6-6-6 6" />
                                        </svg>
                                    </Button>
                                    <Input
                                        className="w-12 h-9 text-center"
                                        value={
                                            selectedDate
                                                ? format(selectedDate, "HH")
                                                : "00"
                                        }
                                        onChange={(e) => {
                                            const now = new Date();
                                            const date = selectedDate || now;
                                            const hours = parseInt(
                                                e.target.value,
                                                10
                                            );

                                            if (
                                                !isNaN(hours) &&
                                                hours >= 0 &&
                                                hours <= 23
                                            ) {
                                                const newDate = new Date(date);
                                                newDate.setHours(hours);
                                                handleDateSelect(newDate);
                                            }
                                        }}
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => {
                                            if (!selectedDate) {
                                                const now = new Date();
                                                handleDateSelect(now);
                                                return;
                                            }

                                            const newDate = new Date(
                                                selectedDate
                                            );
                                            const currentHour =
                                                newDate.getHours();
                                            newDate.setHours(
                                                (currentHour + 23) % 24
                                            ); // +23 instead of -1 to handle wrap-around
                                            handleDateSelect(newDate);
                                        }}
                                    >
                                        <span className="sr-only">
                                            Decrease hour
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4"
                                        >
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </Button>
                                </div>

                                <span className="text-xl">:</span>

                                {/* Minutes */}
                                <div className="flex flex-col items-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => {
                                            if (!selectedDate) {
                                                const now = new Date();
                                                handleDateSelect(now);
                                                return;
                                            }

                                            const newDate = new Date(
                                                selectedDate
                                            );
                                            const currentMinute =
                                                newDate.getMinutes();
                                            newDate.setMinutes(
                                                (currentMinute + 1) % 60
                                            );
                                            handleDateSelect(newDate);
                                        }}
                                    >
                                        <span className="sr-only">
                                            Increase minute
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4"
                                        >
                                            <path d="m18 15-6-6-6 6" />
                                        </svg>
                                    </Button>
                                    <Input
                                        className="w-12 h-9 text-center"
                                        value={
                                            selectedDate
                                                ? format(selectedDate, "mm")
                                                : "00"
                                        }
                                        onChange={(e) => {
                                            const now = new Date();
                                            const date = selectedDate || now;
                                            const minutes = parseInt(
                                                e.target.value,
                                                10
                                            );

                                            if (
                                                !isNaN(minutes) &&
                                                minutes >= 0 &&
                                                minutes <= 59
                                            ) {
                                                const newDate = new Date(date);
                                                newDate.setMinutes(minutes);
                                                handleDateSelect(newDate);
                                            }
                                        }}
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => {
                                            if (!selectedDate) {
                                                const now = new Date();
                                                handleDateSelect(now);
                                                return;
                                            }

                                            const newDate = new Date(
                                                selectedDate
                                            );
                                            const currentMinute =
                                                newDate.getMinutes();
                                            newDate.setMinutes(
                                                (currentMinute + 59) % 60
                                            ); // +59 instead of -1 to handle wrap-around
                                            handleDateSelect(newDate);
                                        }}
                                    >
                                        <span className="sr-only">
                                            Decrease minute
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4"
                                        >
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            {/* Hidden input to store the ISO value */}
            <Input type="hidden" value={eta} />
        </div>
    );
}
