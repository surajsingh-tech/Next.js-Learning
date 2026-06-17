'use client'
import React from "react";

type ErrorPage = {
  error: Error;
};

export default function error({ error }: ErrorPage) {
  return <div>{error.message}</div>;
}
