import Debug "mo:base/Debug";
import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import Array "mo:base/Array";
import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";

import Int = "mo:base/Int";
import Time = "mo:base/Time";
import Principal = "mo:base/Principal";

import Result "mo:base/Result";
import Nat "mo:base/Nat";
import TrieMap "mo:base/TrieMap";
import Nat64 "mo:base/Nat64";
import P "mo:base/Prelude";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

import Types "Types";

actor {

    public type Tokens = Nat;
    public type TxIndex = Nat;
    public type BlockIndex = Nat;
    public type Subaccount = Blob;
    public type Timestamp = Nat64;

    public type Account = {
        owner : Principal;
        subaccount : ?Subaccount;
    };

    public type TransferArg = {
        from_subaccount : ?Subaccount;
        to : Account;
        amount : Tokens;
        fee : ?Tokens;
        memo : ?Blob;
        created_at_time : ?Timestamp;
    };

    public type TransferError = {
        #BadFee : { expected_fee : Tokens };
        #BadBurn : { min_burn_amount : Tokens };
        #InsufficientFunds : { balance : Tokens };
        #TooOld;
        #CreatedInFuture : { ledger_time : Nat64 };
        #TemporarilyUnavailable;
        #Duplicate : { duplicate_of : BlockIndex };
        #GenericError : { error_code : Nat; message : Text };
    };

    public type TransferResult = {
        #Ok : BlockIndex;
        #Err : TransferError;
    };

    public type MetadataValue = {
        #Nat : Nat;
        #Int : Int;
        #Text : Text;
        #Blob : Blob;
    };

    public type ApproveArgs = {
        from_subaccount : ?Subaccount;
        spender : Account;
        amount : Tokens;
        expected_allowance : ?Tokens;
        expires_at : ?Timestamp;
        fee : ?Tokens;
        memo : ?Blob;
        created_at_time : ?Timestamp;
    };

    public type ApproveError = {
        #BadFee : { expected_fee : Tokens };
        #InsufficientFunds : { balance : Tokens };
        #AllowanceChanged : { current_allowance : Tokens };
        #Expired : { ledger_time : Nat64 };
        #TooOld;
        #CreatedInFuture : { ledger_time : Nat64 };
        #Duplicate : { duplicate_of : BlockIndex };
        #TemporarilyUnavailable;
        #GenericError : { error_code : Nat; message : Text };
    };

    public type ApproveResult = {
        #Ok : BlockIndex;
        #Err : ApproveError;
    };

    public type AllowanceArgs = {
        account : Account;
        spender : Account;
    };

    public type Allowance = {
        allowance : Tokens;
        expires_at : ?Timestamp;
    };

    public type TransferFromArgs = {
        spender_subaccount : ?Subaccount;
        from : Account;
        to : Account;
        amount : Tokens;
        fee : ?Tokens;
        memo : ?Blob;
        created_at_time : ?Timestamp;
    };

    public type TransferFromResult = {
        #Ok : BlockIndex;
        #Err : TransferFromError;
    };

    public type TransferFromError = {
        #BadFee : { expected_fee : Tokens };
        #BadBurn : { min_burn_amount : Tokens };
        #InsufficientFunds : { balance : Tokens };
        #InsufficientAllowance : { allowance : Tokens };
        #TooOld;
        #CreatedInFuture : { ledger_time : Nat64 };
        #Duplicate : { duplicate_of : BlockIndex };
        #TemporarilyUnavailable;
        #GenericError : { error_code : Nat; message : Text };
    };

    let canisterId = "mityp-faaaa-aaaap-qcata-cai";

    public type DepositArgs = {
        spender_subaccount : ?Blob;
        token : Principal;
        from : Account;
        amount : Nat;
        fee : ?Nat;
        memo : ?Blob;
        created_at_time : ?Nat64;
    };

    public type DepositError = {
        #TransferFromError : TransferFromError;
    };

    public func total_supply() : async Nat {
        let canister2 = actor (canisterId) : actor {
            icrc1_total_supply : () -> async Nat;
        };
        return await canister2.icrc1_total_supply();
    };

    public func get_symbol() : async Text {
        let canister2 = actor (canisterId) : actor {
            icrc1_symbol : () -> async Text;
        };
        return await canister2.icrc1_symbol();
    };

    public func get_balance_of(args : Account) : async Tokens {
        let canister2 = actor (canisterId) : actor {
            icrc1_balance_of : (args : Account) -> async Tokens;
        };
        return await canister2.icrc1_balance_of(args : Account);
    };

    public func get_token_name() : async Text {
        let canister2 = actor (canisterId) : actor {
            icrc1_name : () -> async Text;
        };
        return await canister2.icrc1_name();
    };

    public func get_token_metadata() : async [(Text, MetadataValue)] {
        let canister2 = actor (canisterId) : actor {
            icrc1_metadata : () -> async [(Text, MetadataValue)];
        };
        return await canister2.icrc1_metadata();
    };

    public func get_total_supply() : async Tokens {
        let canister2 = actor (canisterId) : actor {
            icrc1_total_supply : () -> async Tokens;
        };
        return await canister2.icrc1_total_supply();
    };

    public func get_fee_value() : async Tokens {
        let canister2 = actor (canisterId) : actor {
            icrc1_fee : () -> async Tokens;
        };
        return await canister2.icrc1_fee();
    };

    public func get_minting_account() : async ?Account {
        let canister2 = actor (canisterId) : actor {
            icrc1_minting_account : () -> async ?Account;
        };
        return await canister2.icrc1_minting_account();
    };

    public func token_transfer(args : TransferArg) : async TransferResult {
        let canister2 = actor (canisterId) : actor {
            icrc1_transfer : (args : TransferArg) -> async TransferResult;
        };
        return await canister2.icrc1_transfer(args : TransferArg);
    };

    public func get_supported_standards() : async [{ name : Text; url : Text }] {
        let canister2 = actor (canisterId) : actor {
            icrc1_supported_standards : () -> async [{ name : Text; url : Text }];
        };
        return await canister2.icrc1_supported_standards();
    };

    public func approve(args : ApproveArgs) : async ApproveResult {
        let canister2 = actor (canisterId) : actor {
            icrc2_approve : (args : ApproveArgs) -> async ApproveResult;
        };
        return await canister2.icrc2_approve(args : ApproveArgs);
    };

    public func allowance(args : AllowanceArgs) : async Allowance {
        let canister2 = actor (canisterId) : actor {
            icrc2_allowance : (args : AllowanceArgs) -> async Allowance;
        };
        return await canister2.icrc2_allowance(args : AllowanceArgs);
    };

    public func transfer_from(args : TransferFromArgs) : async TransferFromResult {
        let canister2 = actor (canisterId) : actor {
            icrc2_transfer_from : (args : TransferFromArgs) -> async TransferFromResult;
        };
        return await canister2.icrc2_transfer_from(args : TransferFromArgs);
    };

    public shared (msg) func whoami() : async Principal {
        msg.caller;
    };

    public shared (msg) func ICP_to_SakaCoins_Exchange_Rate() : async Text {
        let ic : Types.IC = actor ("aaaaa-aa");

        let host : Text = "endpoint.emmanuelhaggai.com";
        let url = "https://endpoint.emmanuelhaggai.com/exchange-rate/";

        let now = Int.toText(Time.now());
        let caller = Principal.toText(msg.caller);
        let combo = now # caller;

        let idempotency_key : Text = combo;
        let request_headers = [
            { name = "Host"; value = host # ":443" },
            { name = "User-Agent"; value = "http_post_sample" },
            { name = "Content-Type"; value = "application/json" },
            { name = "Idempotency-Key"; value = idempotency_key },
        ];

        let request_body_json : Text = "{ \"ExchangeRate\" : \"ICP\",\"ID\" : \"" # idempotency_key # "\" }";
        let request_body_as_Blob : Blob = Text.encodeUtf8(request_body_json);
        let request_body_as_nat8 : [Nat8] = Blob.toArray(request_body_as_Blob);

        let transform_context : Types.TransformContext = {
            function = transform;
            context = Blob.fromArray([]);
        };

        let http_request : Types.HttpRequestArgs = {
            url = url;
            max_response_bytes = null;
            headers = request_headers;
            body = ?request_body_as_nat8;
            method = #post;
            transform = ?transform_context;

        };

        Cycles.add(21_850_258_000);

        let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);

        let response_body : Blob = Blob.fromArray(http_response.body);
        let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
            case (null) { "No value returned" };
            case (?y) { y };
        };

        decoded_text;
    };

    public shared (msg) func KES_to_SakaCoins_Exchange_Rate() : async Text {
        let ic : Types.IC = actor ("aaaaa-aa");

        let host : Text = "endpoint.emmanuelhaggai.com";
        let url = "https://endpoint.emmanuelhaggai.com/exchange-rate/";

        let now = Int.toText(Time.now());
        let caller = Principal.toText(msg.caller);
        let combo = now # caller;

        let idempotency_key : Text = combo;
        let request_headers = [
            { name = "Host"; value = host # ":443" },
            { name = "User-Agent"; value = "http_post_sample" },
            { name = "Content-Type"; value = "application/json" },
            { name = "Idempotency-Key"; value = idempotency_key },
        ];

        let request_body_json : Text = "{ \"ExchangeRate\" : \"USD\",\"ID\" : \"" # idempotency_key # "\" }";
        let request_body_as_Blob : Blob = Text.encodeUtf8(request_body_json);
        let request_body_as_nat8 : [Nat8] = Blob.toArray(request_body_as_Blob);

        let transform_context : Types.TransformContext = {
            function = transform;
            context = Blob.fromArray([]);
        };

        let http_request : Types.HttpRequestArgs = {
            url = url;
            max_response_bytes = null;
            headers = request_headers;
            body = ?request_body_as_nat8;
            method = #post;
            transform = ?transform_context;

        };

        Cycles.add(21_850_258_000);

        let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);

        let response_body : Blob = Blob.fromArray(http_response.body);
        let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
            case (null) { "No value returned" };
            case (?y) { y };
        };

        decoded_text;
    };

    public shared func greet(name : Text, phone : Text) : async Text {
        return "<div class='alert alert-success' id='alert_success' role='alert'> Hello, " # name # ", your phone number is (" # phone # ") </div>";
    };

    public shared (msg) func WhatsApp_API_request(name : Text, phone : Text) : async Text {
        let ic : Types.IC = actor ("aaaaa-aa");

        let host : Text = "endpoint.emmanuelhaggai.com";
        let url = "https://endpoint.emmanuelhaggai.com/icp-request/";

        let now = Int.toText(Time.now());
        let caller = Principal.toText(msg.caller);
        let combo = now # caller;

        let idempotency_key : Text = combo;
        let request_headers = [
            { name = "Host"; value = host # ":443" },
            { name = "User-Agent"; value = "http_post_sample" },
            { name = "Content-Type"; value = "application/json" },
            { name = "Idempotency-Key"; value = idempotency_key },
        ];

        let request_body_json : Text = "{ \"name\" : \"" # name # "\", \"phone\" : \"" # phone # "\", \"ID\" : \"" # idempotency_key # "\" }";
        let request_body_as_Blob : Blob = Text.encodeUtf8(request_body_json);
        let request_body_as_nat8 : [Nat8] = Blob.toArray(request_body_as_Blob);

        let transform_context : Types.TransformContext = {
            function = transform;
            context = Blob.fromArray([]);
        };

        let http_request : Types.HttpRequestArgs = {
            url = url;
            max_response_bytes = null;
            headers = request_headers;
            body = ?request_body_as_nat8;
            method = #post;
            transform = ?transform_context;

        };

        Cycles.add(21_850_258_000);

        let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);

        let response_body : Blob = Blob.fromArray(http_response.body);
        let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
            case (null) { "No value returned" };
            case (?y) { y };
        };

        decoded_text;
    };

    public shared (msg) func SakaAI_query(prompt : Text) : async Text {
        let ic : Types.IC = actor ("aaaaa-aa");

        let host : Text = "endpoint.emmanuelhaggai.com";
        let url = "https://endpoint.emmanuelhaggai.com/sakaai/";

        let now = Int.toText(Time.now());
        let caller = Principal.toText(msg.caller);
        let combo = now # caller;

        let idempotency_key : Text = combo;
        let request_headers = [
            { name = "Host"; value = host # ":443" },
            { name = "User-Agent"; value = "http_post_sample" },
            { name = "Content-Type"; value = "application/json" },
            { name = "Idempotency-Key"; value = idempotency_key },
        ];

        let request_body_json : Text = "{ \"prompt\" : \"" # prompt # "\", \"ID\" : \"" # idempotency_key # "\" }";
        let request_body_as_Blob : Blob = Text.encodeUtf8(request_body_json);
        let request_body_as_nat8 : [Nat8] = Blob.toArray(request_body_as_Blob);

        let transform_context : Types.TransformContext = {
            function = transform;
            context = Blob.fromArray([]);
        };

        let http_request : Types.HttpRequestArgs = {
            url = url;
            max_response_bytes = null;
            headers = request_headers;
            body = ?request_body_as_nat8;
            method = #post;
            transform = ?transform_context;

        };

        Cycles.add(21_850_258_000);

        let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);

        let response_body : Blob = Blob.fromArray(http_response.body);
        let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
            case (null) { "No value returned" };
            case (?y) { y };
        };

        decoded_text;
    };

    public shared (msg) func ai_image_processing(base64img : Text, img_type : Text, authorization_code : Text) : async Text {
        let ic : Types.IC = actor ("aaaaa-aa");

        let host : Text = "endpoint.emmanuelhaggai.com";
        let url = "https://endpoint.emmanuelhaggai.com/icp-img-ai/";

        let now = Int.toText(Time.now());
        let caller = Principal.toText(msg.caller);
        let combo = now # caller;

        let idempotency_key : Text = combo;
        let request_headers = [
            { name = "Host"; value = host # ":443" },
            { name = "User-Agent"; value = "http_post_sample" },
            { name = "Content-Type"; value = "application/json" },
            { name = "Idempotency-Key"; value = idempotency_key },
        ];

        let request_body_json : Text = "{ \"base64img\" : \"" # base64img # "\", \"img_type\" : \"" # img_type # "\", \"authorization_code\" : \"" # authorization_code # "\", \"ID\" : \"" # idempotency_key # "\" }";
        let request_body_as_Blob : Blob = Text.encodeUtf8(request_body_json);
        let request_body_as_nat8 : [Nat8] = Blob.toArray(request_body_as_Blob);

        let transform_context : Types.TransformContext = {
            function = transform;
            context = Blob.fromArray([]);
        };

        let http_request : Types.HttpRequestArgs = {
            url = url;
            max_response_bytes = null;
            headers = request_headers;
            body = ?request_body_as_nat8;
            method = #post;
            transform = ?transform_context;

        };

        Cycles.add(21_850_258_000);

        let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);

        let response_body : Blob = Blob.fromArray(http_response.body);
        let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
            case (null) { "No value returned" };
            case (?y) { y };
        };

        decoded_text;
    };

    public query func transform(raw : Types.TransformArgs) : async Types.CanisterHttpResponsePayload {
        let transformed : Types.CanisterHttpResponsePayload = {
            status = raw.response.status;
            body = raw.response.body;
            headers = [
                {
                    name = "Content-Security-Policy";
                    value = "default-src 'self'";
                },
                { name = "Referrer-Policy"; value = "strict-origin" },
                { name = "Permissions-Policy"; value = "geolocation=(self)" },
                {
                    name = "Strict-Transport-Security";
                    value = "max-age=63072000";
                },
                { name = "X-Frame-Options"; value = "DENY" },
                { name = "X-Content-Type-Options"; value = "nosniff" },
            ];
        };
        transformed;
    };

    public shared (msg) func generateUUID() : async Text {
        let now = Int.toText(Time.now());
        let caller = Principal.toText(msg.caller);
        let combo = now # caller;
        combo;
    };

};
