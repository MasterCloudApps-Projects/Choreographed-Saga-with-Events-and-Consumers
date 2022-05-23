import express from "express";

export function createPublicServer(server) {
  server.use('/', express.static('public'));
}
