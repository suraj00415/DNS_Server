import { CURRENT_DOMAIN, QueryTYPE } from "../utils/enums";

type DnsRecord = {
    type: QueryTYPE;
    name: string;
    value: string;
    ttl: number;
};

const dnsRecords: DnsRecord[] = [
    { type: QueryTYPE.A, name: "example.com", value: "192.0.2.34", ttl: 3600 },
    { type: QueryTYPE.PTR, name: "1.0.0.127.in-addr.arpa", value: CURRENT_DOMAIN, ttl: 3600 },
    { type: QueryTYPE.A, name: "www.instagram.com", value: "157.240.237.174", ttl: 3600 },
    { type: QueryTYPE.A, name: "instagram.com", value: "157.240.237.174", ttl: 3600 },
    { type: QueryTYPE.A, name: "example.com", value: "192.0.2.1", ttl: 3600 },
    { type: QueryTYPE.A, name: "example.com", value: "168.0.23.10", ttl: 3600 },
    { type: QueryTYPE.A, name: "example.com", value: "192.168.198.135", ttl: 3600 },
    { type: QueryTYPE.A, name: "example.com.uniboxlogin.wifi-soft.com", value: "192.0.2.2", ttl: 3600 },
    { type: QueryTYPE.A, name: "api.example.com", value: "192.0.2.2", ttl: 3600 },
    { type: QueryTYPE.A, name: "blog.example.com", value: "192.0.2.3", ttl: 3600 },
    { type: QueryTYPE.AAAA, name: "example.com", value: "2001:db8::1", ttl: 3600 },
    { type: QueryTYPE.AAAA, name: "api.example.com", value: "2001:db8::2", ttl: 3600 },
    { type: QueryTYPE.CNAME, name: "www.example.com", value: "example.com", ttl: 3600 },
    { type: QueryTYPE.CNAME, name: "mail.example.com", value: "example.com", ttl: 3600 },
    { type: QueryTYPE.NS, name: "example.com", value: "ns1.example.com", ttl: 3600 },
    { type: QueryTYPE.NS, name: "example.com", value: "ns2.example.com", ttl: 3600 },
    { type: QueryTYPE.A, name: "shop.example.com", value: "192.0.2.4", ttl: 3600 },
    { type: QueryTYPE.A, name: "test.example.com", value: "192.0.2.5", ttl: 3600 },
    { type: QueryTYPE.AAAA, name: "shop.example.com", value: "2001:db8::4", ttl: 3600 },
    { type: QueryTYPE.AAAA, name: "test.example.com", value: "2001:db8::5", ttl: 3600 },
    { type: QueryTYPE.CNAME, name: "blog.example.com", value: "www.example.com", ttl: 3600 },
    { type: QueryTYPE.NS, name: "example.com", value: "ns3.example.com", ttl: 3600 },
    { type: QueryTYPE.NS, name: "example.com", value: "ns4.example.com", ttl: 3600 },
    { type: QueryTYPE.A, name: "static.example.com", value: "192.0.2.6", ttl: 3600 },
    { type: QueryTYPE.AAAA, name: "static.example.com", value: "2001:db8::6", ttl: 3600 },
    { type: QueryTYPE.CNAME, name: "cdn.example.com", value: "static.example.com", ttl: 3600 },
    { type: QueryTYPE.NS, name: "example.com", value: "ns5.example.com", ttl: 3600 },
];

export const ROOT_SERVERS = [
    "198.41.0.4",   // a.root-servers.net
    "199.9.14.201", // b.root-servers.net
    "192.33.4.12",  // c.root-servers.net
];

export default dnsRecords;