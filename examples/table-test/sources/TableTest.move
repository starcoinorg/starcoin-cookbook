/// This module provides test tables of various key / value types, for use in API tests
module TableTest::TableTest {
    use StarcoinFramework::Table::{Self, Table};
    use StarcoinFramework::Signer;
    use StarcoinFramework::Debug;



    struct TestTables has key {
        u8_table: Table<u8, u8>,
	table_table: Table<u8, Table<u8, u8>>,
    }

    public(script) fun make_test_tables(account: signer) {

        let test_tables = TestTables {
            u8_table: Table::new<u8, u8>(),
	    table_table: Table::new<u8, Table<u8, u8>>(),
        };

        move_to(&account, test_tables);
    }

     public(script) fun incr_table_elem(account: signer, num: u8)  acquires TestTables {
            let t = borrow_global_mut<TestTables>(Signer::address_of(&account));
            Table::add(&mut t.u8_table, num, num);

     }

     public(script) fun create_table_table(account: signer, num: u8)  acquires TestTables {
            let t = borrow_global_mut<TestTables>(Signer::address_of(&account));
            Table::add(&mut t.table_table, num, Table::new());
     }

     public(script) fun incr_table_table_elem(account: signer, num1: u8, num2: u8)  acquires TestTables {
            let t = borrow_global_mut<TestTables>(Signer::address_of(&account));
	    Table::add(Table::borrow_mut(&mut t.table_table, num1), num2, num2);
     }

     public(script) fun show_table_elem(account: signer, num: u8) acquires TestTables {
	   let t = borrow_global<TestTables>(Signer::address_of(&account));
	   Debug::print<u8>(&*Table::borrow(&t.u8_table, num));
     }

     public(script) fun show_table_table_elem(account: signer, num1: u8, num2: u8) acquires TestTables {
	   let t = borrow_global<TestTables>(Signer::address_of(&account));
	    let sub_table = Table::borrow(&t.table_table, num1);
	   Debug::print<u8>(&*Table::borrow(sub_table, num2));
     }
}
