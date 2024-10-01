// /components/Sidebar.js
import React, { useState } from "react";
import stylesT from "../../styles/components/TapBa.module.scss";
import Image from "next/image";
import Link from "next/link";

const LayoutTopbar = () => {
  return (
    <div className={stylesT.layoutTopbar}>
        <Image
          src="/images/Logo-sidebar.png"
          alt="Logo"
          className={stylesT.logoImage}
          width={140}
          height={50}
        />

      <button
        type="button"
        className={`${stylesT.layoutMenuButton} ${stylesT.pLink}`}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        type="button"
        className={`${stylesT.layoutTopbarMenuButton} ${stylesT.pLink}`}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <div className={stylesT.layoutTopbarMenu}>
        <button
          type="button"
          className={`${stylesT.layoutTopbarButton} ${stylesT.pLink}`}
        >
          <i className="pi pi-calendar"></i>
          <span>Calendar</span>
        </button>
        <button
          type="button"
          className={`${stylesT.layoutTopbarButton} ${stylesT.pLink}`}
        >
          <i className="pi pi-user"></i>
          <span>Profile</span>
        </button>
        <Link href="/documentation">
          <button
            type="button"
            className={`${stylesT.layoutTopbarButton} ${stylesT.pLink}`}
          >
            <i className="pi pi-cog"></i>
            <span>Settings</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LayoutTopbar;
