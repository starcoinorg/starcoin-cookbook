/// This module provides test tables of various key / value types, for use in API tests
module TableTest::TableTest {
    use StarcoinFramework::Table::{Self, Table};
    use StarcoinFramework::Signer;
    use StarcoinFramework::Debug;



    struct TestTables has key {
        u8_table: Table<u8, u8>,
    }

    public entry fun make_test_tables(account: signer) {

        let test_tables = TestTables {
            u8_table: Table::new<u8, u8>(),
        };

        move_to(&account, test_tables);
    }

     public entry fun incr_table_elem(account: signer, num: u8)  acquires TestTables {
            let t = borrow_global_mut<TestTables>(Signer::address_of(&account));
            Table::add(&mut t.u8_table, num, num);

     }

     public entry fun show_table_elem(account: signer, num: u8) acquires TestTables {
	   let t = borrow_global<TestTables>(Signer::address_of(&account));
	   Debug::print<u8>(&*Table::borrow(&t.u8_table, num));
     }
}
