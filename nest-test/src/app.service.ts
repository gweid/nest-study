const net = require('net');
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    function scanPort(ip, port, timeout = 2000) {
      return new Promise((resolve) => {
        const socket = new net.Socket();
        const status = { port, status: 'closed' };
    
        socket.setTimeout(timeout);
        socket.on('connect', () => {
          console.log('connect');
          status.status = 'open';
          socket.end();
        });
        socket.on('timeout', () => {
          console.log('timeout');
          socket.destroy();
        });
        socket.on('error', () => {
          console.log('error');
          socket.destroy();
        });
        socket.on('close', () => {
          console.log('close');
          resolve(status);
        });
    
        socket.connect(port, ip);
      });
    }
    
    function scanPorts(ip, startPort, endPort) {
      const portScans = [];
      for (let port = startPort; port <= endPort; port++) {
        portScans.push(scanPort(ip, port));
      }
      return Promise.all(portScans);
    }
    
    // 示例IP和端口范围
    const ip = '123.179.178.215';
    const portRange = '9999-10001';
    const [startPort, endPort] = portRange.split('-').map(Number);
    
    const results = await scanPorts(ip, startPort, endPort)
    return JSON.stringify(results, null, 2)
    // return 'Hello World!';
  }
}
