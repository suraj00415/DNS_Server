type DnsRecord = {
    type: "A" | "AAAA" | "CNAME" | "NS";
    name: string;
    value: string;
    ttl: number;
};

const dnsRecords: DnsRecord[] = [
    { type: "A", name: "example.com", value: "192.0.2.34", ttl: 3600 },
    { type: "A", name: "example.com", value: "192.0.2.1", ttl: 3600 },
    { type: "A", name: "example.com", value: "168.0.23.10", ttl: 3600 },
    { type: "A", name: "example.com.uniboxlogin.wifi-soft.com", value: "192.0.2.2", ttl: 3600 },
    { type: "A", name: "api.example.com", value: "192.0.2.2", ttl: 3600 },
    { type: "A", name: "blog.example.com", value: "192.0.2.3", ttl: 3600 },
    { type: "AAAA", name: "example.com", value: "2001:db8::1", ttl: 3600 },
    { type: "AAAA", name: "api.example.com", value: "2001:db8::2", ttl: 3600 },
    { type: "CNAME", name: "www.example.com", value: "example.com", ttl: 3600 },
    { type: "CNAME", name: "mail.example.com", value: "example.com", ttl: 3600 },
    { type: "NS", name: "example.com", value: "ns1.example.com", ttl: 3600 },
    { type: "NS", name: "example.com", value: "ns2.example.com", ttl: 3600 },
    { type: "A", name: "shop.example.com", value: "192.0.2.4", ttl: 3600 },
    { type: "A", name: "test.example.com", value: "192.0.2.5", ttl: 3600 },
    { type: "AAAA", name: "shop.example.com", value: "2001:db8::4", ttl: 3600 },
    { type: "AAAA", name: "test.example.com", value: "2001:db8::5", ttl: 3600 },
    { type: "CNAME", name: "blog.example.com", value: "www.example.com", ttl: 3600 },
    { type: "NS", name: "example.com", value: "ns3.example.com", ttl: 3600 },
    { type: "NS", name: "example.com", value: "ns4.example.com", ttl: 3600 },
    { type: "A", name: "static.example.com", value: "192.0.2.6", ttl: 3600 },
    { type: "AAAA", name: "static.example.com", value: "2001:db8::6", ttl: 3600 },
    { type: "CNAME", name: "cdn.example.com", value: "static.example.com", ttl: 3600 },
    { type: "NS", name: "example.com", value: "ns5.example.com", ttl: 3600 }
];

export default dnsRecords;
