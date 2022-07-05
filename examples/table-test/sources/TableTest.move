/// This module provides test tables of various key / value types, for use in API tests
module TableTest::TableTest {
    use StarcoinFramework::Table::{Self, Table};
    use StarcoinFramework::Vector;
    use StarcoinFramework::Signer;



    struct TestTables has key {
        u8_table: Table<u8, u8>,
        u64_table: Table<u64, u64>,
        u128_table: Table<u128, u128>,
        bool_table: Table<bool, bool>,
        address_table: Table<address, address>,
        vector_u8_table: Table<vector<u8>, vector<u8>>,
    }

    public(script) fun make_test_tables(account: signer) {

        let vec_u8 = Vector::empty<u8>();
        Vector::push_back(&mut vec_u8, 1);
        Vector::push_back(&mut vec_u8, 2);

        let test_tables = TestTables {
            u8_table: Table::new(),
            u64_table: Table::new(),
            u128_table: Table::new(),
            bool_table: Table::new(),
            address_table: Table::new(),
            vector_u8_table: Table::new(),
        };

        let t = &mut test_tables;

        Table::add(&mut t.u8_table, 1, 1);
        Table::add(&mut t.u64_table, 1, 1);
        Table::add(&mut t.u128_table, 1, 1);
        Table::add(&mut t.bool_table, true, true);
        Table::add(&mut t.address_table, @0x1, @0x1);
        Table::add(&mut t.vector_u8_table, copy vec_u8, vec_u8);
        move_to(&account, test_tables);
    }

     public(script) fun incr_table(account: signer, num: u8)  acquires TestTables {
            let t = borrow_global_mut<TestTables>(Signer::address_of(&account));
            Table::add(&mut t.u8_table, num, num);
     }
}
