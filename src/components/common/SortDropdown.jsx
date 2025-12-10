import React, { useState, useRef, useEffect, useCallback } from "react";
import sort_by from "../../assets/images/sort_by.svg";
import { FiX } from "react-icons/fi";

const SortDropdown = ({
    options = [],
    selected = null,
    onChange = () => { },
    closeOnSelect = true,
    buttonClassName = "",
    menuStyle = {},
}) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);
    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    const toggleOpen = useCallback((val) => {
        setOpen((prev) => (typeof val === "boolean" ? val : !prev));
    }, []);

    useEffect(() => {
        if (!open) return;

        const onPointerDown = (e) => {
            const path = e.composedPath ? e.composedPath() : [];
            if (!path.includes(rootRef.current)) setOpen(false);
        };

        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
                buttonRef.current?.focus();
            }
        };

        document.addEventListener("pointerdown", onPointerDown, { capture: true });
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("pointerdown", onPointerDown, { capture: true });
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    const handleToggleClick = (e) => {
        e.stopPropagation();
        toggleOpen();
    };

    const handleSelect = (opt, e) => {
        e.stopPropagation();
        onChange(opt);
        if (closeOnSelect) setOpen(false);
    };

    return (
        <div ref={rootRef} className="position-relative" style={{ display: "inline-block" }}>
            <button
                ref={buttonRef}
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                className={`d-flex align-items-center ${buttonClassName}`}
                style={{
                    maxWidth: "fit-content",
                    gap: "8px",
                    backgroundColor: "#F5F5F5",
                    borderRadius: "50px",
                    border: "1px solid #E4E4E4",
                    padding: "14px 24px",
                    cursor: "pointer",
                    fontSize: "15px",
                    color: "#444",
                }}
                onClick={handleToggleClick}
            >
                <img src={sort_by} alt="sort_by" />
                <span style={{ fontSize: "15px", color: "#444" }}>
                    {selected?.label || "Sort by"}
                </span>

                {selected && (
                    <FiX
                        size={20}
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange(null);
                        }}
                        style={{ marginLeft: 4, cursor: "pointer" }}
                    />
                )}
            </button>

            {open && (
                <ul
                    ref={menuRef}
                    role="menu"
                    aria-label="Sort options"
                    className="dropdown-menu show"
                    style={{
                        position: "absolute",
                        top: "55px",
                        right: 0,
                        minWidth: "200px",
                        borderRadius: "14px",
                        boxShadow: "0px 8px 25px rgba(0,0,0,0.12)",
                        zIndex: 9999,
                        padding: "8px 0",
                        margin: 0,
                        listStyle: "none",
                        background: "white",
                        border: "1px solid #eaeaea",
                        ...menuStyle,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "8px 16px",
                            fontWeight: 600,
                            color: "#333",
                            fontSize: "15px",
                            borderBottom: "1px solid #efefef",
                        }}
                    >
                        <span>Filter</span>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(false);
                            }}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                            }}
                        >
                            <FiX size={20} color="#444" />
                        </button>
                    </div>

                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={(e) => handleSelect(opt, e)}
                            style={{
                                width: "100%",
                                textAlign: "left",
                                padding: "12px 16px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "14px",
                                transition: "0.2s ease",
                                background:
                                    selected?.value === opt.value
                                        ? "#e9f5ff"
                                        : "transparent",
                            }}
                            onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                                selected?.value === opt.value ? "#e9f5ff" : "#f7f7f7")
                            }
                            onMouseLeave={(e) =>
                            (e.currentTarget.style.background =
                                selected?.value === opt.value ? "#e9f5ff" : "transparent")
                            }
                        >
                            {opt.label}
                        </button>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SortDropdown;
