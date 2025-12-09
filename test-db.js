import { Client } from 'pg';

async function testDatabase() {
  const connectionString = 'postgresql://neondb_owner:npg_AxJDb8ZokH6X@ep-muddy-band-a4c31lkn-pooler.us-east-1.aws.neon.tech/shopifypromoapp?sslmode=require';
  
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Database connected successfully!');

    // Test 1: Check if subscribers table exists
    console.log('\n📋 Checking if subscribers table exists...');
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'subscribers'
      );
    `);
    console.log('Table exists:', tableCheck.rows[0].exists);

    if (tableCheck.rows[0].exists) {
      // Test 2: Check table structure
      console.log('\n🔍 Checking table structure...');
      const structure = await client.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_name = 'subscribers'
        ORDER BY ordinal_position;
      `);
      console.log('Table structure:');
      console.table(structure.rows);

      // Test 3: Count existing records
      console.log('\n📊 Counting existing records...');
      const count = await client.query('SELECT COUNT(*) FROM subscribers');
      console.log('Total records:', count.rows[0].count);

      // Test 4: Show recent records (if any)
      const recent = await client.query(`
        SELECT id, email, source_page, created_at 
        FROM subscribers 
        ORDER BY created_at DESC 
        LIMIT 5
      `);
      if (recent.rows.length > 0) {
        console.log('\nRecent records:');
        console.table(recent.rows);
      } else {
        console.log('No records found in table');
      }
    } else {
      // Create the table if it doesn't exist
      console.log('\n🛠️  Creating subscribers table...');
      await client.query(`
        CREATE TABLE subscribers (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          source_page VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('✅ Table created successfully!');
    }

    // Test 5: Test insert operation
    console.log('\n🧪 Testing insert operation...');
    const testEmail = `test${Date.now()}@example.com`;
    const insertResult = await client.query(`
      INSERT INTO subscribers (email, source_page)
      VALUES ($1, $2)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, created_at
    `, [testEmail, 'test']);
    
    if (insertResult.rows.length > 0) {
      console.log('✅ Insert successful:', insertResult.rows[0]);
    } else {
      console.log('ℹ️  Insert skipped (email already exists)');
    }

  } catch (error) {
    console.error('❌ Database test failed:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      detail: error.detail
    });
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed');
  }
}

testDatabase();
