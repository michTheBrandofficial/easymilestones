import { cn } from "@/lib/utils";
import { ChevronDown, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
export interface Option {
  value: string;
  label: string;
}

interface SearchableDropdownProps {
  options: Option[];
  value: Option | null;
  onChange: (option: Option | null) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  fullWidth?: boolean;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  id,
  name,
  required = false,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropDownPosition] = useState<"top" | "bottom">(
    "bottom"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset search term when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleOptionClick = (option: Option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
    inputRef.current?.blur();
  };

  const handleClearClick = () => {
    onChange({
      label: "",
      value: "",
    });
    setSearchTerm("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div tabIndex={1} className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative ">
        <input
          {...rest.inputProps}
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          required={required}
          className={cn(
            "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-20 focus:outline-none text-[#080808] font-medium text-sm ",
            rest.inputProps?.className
          )}
          placeholder={placeholder}
          value={searchTerm || value?.label || ""}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="dropdown-options"
          aria-autocomplete="list"
        />
        <div className="absolute right-0 top-0 h-full flex items-center pr-2 space-x-1">
          {(value || searchTerm) && (
            <button
              type="button"
              onClick={handleClearClick}
              className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600"
              aria-label="Clear selection"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (!inputRef.current) return;
              const { top } = inputRef.current.getBoundingClientRect();
              const positionRatio = top / window.innerHeight;
              setDropDownPosition(positionRatio >= 0.5 ? "top" : "bottom");
              setIsOpen(!isOpen);
            }}
            className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600"
            aria-label={isOpen ? "Close dropdown" : "Open dropdown"}
          >
            <ChevronDown
              size={16}
              className={`transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div
          className={cn(
            "absolute z-[10000] mt-1 bg-white border border-gray-300 rounded-[24px] shadow-lg max-h-60 overflow-auto no-scrollbar ",
            { "bottom-14": dropdownPosition === "top" },
            { "top-12": dropdownPosition === "bottom" },
            { "w-full": rest.fullWidth }
          )}
          role="listbox"
          id="dropdown-options"
        >
          {filteredOptions.map((option, index) => (
            <div
              key={option.value}
              role="option"
              aria-selected={value?.value === option.value}
              className={`px-5 py-3 cursor-pointer transition-colors duration-150 border-b
                ${
                  highlightedIndex === index ? "bg-blue-50" : "hover:bg-gray-50"
                }
                ${value?.value === option.value ? "bg-blue-50 font-medium" : ""}
              `}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
