import React from "react";
import Head from "next/head"

export const PageInfo = ({title}) => {
    return (
        <Head>
            <link rel="icon" sizes="48x48" href="/favicon/favicon-32x32.png"/>
            <meta charSet="utf-8" />
            <title>{title}</title>
        </Head>
    )
}