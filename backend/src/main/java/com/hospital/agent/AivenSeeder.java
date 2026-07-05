package com.hospital.agent;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Scanner;

public class AivenSeeder {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("==================================================");
        System.out.println("   Hospital Information Agent - Aiven DB Seeder  ");
        System.out.println("==================================================");

        try {
            System.out.print("Enter Aiven DB Host: ");
            String host = scanner.nextLine().trim();

            System.out.print("Enter Aiven DB Port: ");
            String port = scanner.nextLine().trim();

            System.out.print("Enter Aiven DB User (default: avnadmin): ");
            String user = scanner.nextLine().trim();
            if (user.isEmpty()) user = "avnadmin";

            System.out.print("Enter Aiven DB Password: ");
            String password = scanner.nextLine().trim();

            System.out.println("\nConnecting to Aiven MySQL database...");
            String jdbcUrl = "jdbc:mysql://" + host + ":" + port + "/defaultdb?allowPublicKeyRetrieval=true&allowMultiQueries=true";
            
            // Register MySQL Driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            try (Connection conn = DriverManager.getConnection(jdbcUrl, user, password);
                 Statement stmt = conn.createStatement()) {
                
                System.out.println("Connection successful!");

                // 1. Load and clean schema.sql
                System.out.println("Loading schema.sql...");
                String schemaSql = loadResourceFile("/db/schema.sql");
                // Remove database creation commands to avoid overriding defaultdb
                schemaSql = schemaSql.replace("CREATE DATABASE IF NOT EXISTS hospital_agent_db;", "");
                schemaSql = schemaSql.replace("USE hospital_agent_db;", "");

                System.out.println("Executing schema.sql...");
                stmt.execute(schemaSql);
                System.out.println("Schema created successfully.");

                // 2. Load and clean seed.sql
                System.out.println("Loading seed.sql...");
                String seedSql = loadResourceFile("/db/seed.sql");
                seedSql = seedSql.replace("USE hospital_agent_db;", "");

                System.out.println("Executing seed.sql (Inserting hospital directories)...");
                stmt.execute(seedSql);
                System.out.println("Database seeded successfully!");

            }
        } catch (Exception e) {
            System.err.println("\nError: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static String loadResourceFile(String path) throws Exception {
        try (InputStream is = AivenSeeder.class.getResourceAsStream(path)) {
            if (is == null) {
                throw new IllegalArgumentException("Resource file not found: " + path);
            }
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))) {
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    // Skip SQL comments
                    if (line.trim().startsWith("--") || line.trim().startsWith("#")) {
                        continue;
                    }
                    sb.append(line).append("\n");
                }
                return sb.toString();
            }
        }
    }
}
