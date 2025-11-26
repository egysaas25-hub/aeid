"use client"

import { Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function PricingSection() {
  return (
    <section id="pricing" className="bg-secondary/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Wholesale Pricing & Discounts
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            The more you buy, the more you save. Mix and match designs in sets with automatic bulk discounts applied at
            checkout.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-accent" />
                Pricing Tiers
              </CardTitle>
              <CardDescription>All prices in USD. Minimum order: 1 piece. Mix and match any designs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Purchase Option</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-center">Discount</TableHead>
                      <TableHead className="text-right">Price per Piece</TableHead>
                      <TableHead className="text-right">Total Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Single Piece</TableCell>
                      <TableCell className="text-center">1</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">0%</Badge>
                      </TableCell>
                      <TableCell className="text-right">$700</TableCell>
                      <TableCell className="text-right font-bold">$700</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Quarter Set</TableCell>
                      <TableCell className="text-center">3</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-accent text-accent-foreground">10%</Badge>
                      </TableCell>
                      <TableCell className="text-right">$630</TableCell>
                      <TableCell className="text-right font-bold">$1,890</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Half Set</TableCell>
                      <TableCell className="text-center">6</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-accent text-accent-foreground">15%</Badge>
                      </TableCell>
                      <TableCell className="text-right">$595</TableCell>
                      <TableCell className="text-right font-bold">$3,570</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Full Set</TableCell>
                      <TableCell className="text-center">12</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-accent text-accent-foreground">20%</Badge>
                      </TableCell>
                      <TableCell className="text-right">$560</TableCell>
                      <TableCell className="text-right font-bold">$6,720</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 space-y-2 rounded-lg bg-muted p-4 text-sm">
                <p className="font-medium">Important Notes:</p>
                <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                  <li>Discounts are automatically applied at checkout</li>
                  <li>Mix and match any designs within each set</li>
                  <li>Worldwide shipping available (7-14 business days)</li>
                  <li>Bulk orders welcome - contact us for custom quotes</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
