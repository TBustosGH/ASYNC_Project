import React, { useRef, useEffect, useCallback } from "react";

interface AutoResizeTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
        maxHeight?: number;
};

export const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
    value,
    defaultValue,
    onChange,
    maxHeight = 240,
    className = "",
    ...props
}) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const adjustHeight = useCallback(() => {
        const el = textareaRef.current;
        if (!el) return;

        // Reduce height if text is erased
        el.style.height = "auto";
        const nextHeight = Math.min(el.scrollHeight, maxHeight);
        el.style.height = `${nextHeight}px`;

        // Display a vertical scroll if max height is surpassed
        el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
    }, [maxHeight]);

    // Adjust height at start & when value changes
    useEffect(() => {
        adjustHeight();
    }, [value, defaultValue, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        adjustHeight();
        onChange?.(e);
    };

    return (
        <textarea 
            ref={textareaRef}
            rows={1}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            className={`w-full resize-none p-2.5 text-base focus:outline-none ${className}`}
            {...props}
        />
    );
};