import React from "react";
import { useMemo } from "react";
import { useGetKpisQuery, useGetProductsQuery } from "../../state/api";
import DashboardBox from "../../components/DashboardBox";
import { Box, Typography, useTheme } from "@mui/material";
import BoxHeader from "../../components/BoxHeader";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  Legend,
  Line,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  Pie,
  PieChart,
} from "recharts";
import FlexBetween from "../../components/FlexBetween";

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operationalVsNonOperational = useMemo(() => {
    return (
      kpiData &&
      kpiData[0].monthlyData.map(
        ({ month, nonOperationalExpenses, operationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Non Operational Expenses": nonOperationalExpenses,
            "Operational Expenses": operationalExpenses,
          };
        }
      )
    );
  }, [kpiData]);

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return { id: _id, price: price, expense: expense };
      })
    );
  }, [productData]);

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalVsNonOperational}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 35,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{ margin: "0 0 10px 0", fontSize: "10px" }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader title="Campaigns and Targets" sideText="+4%" />
        <FlexBetween mt="1.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              dataKey="value"
              stroke="none"
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography variant="h3" m="0.3rem 0" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Reprehenderit reprehenderit irure reprehenderit officia.
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography variant="h5" mt="0.4rem">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up 35% from last month
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader title="Potential Prices vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 40,
              left: -10,
              bottom: 40,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              tickFormatter={(v) => `$${v}`}
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              tickFormatter={(v) => `$${v}`}
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
